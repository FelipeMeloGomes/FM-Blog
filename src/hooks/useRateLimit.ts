import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { CONSTANTS } from "../utils/constants";

const WINDOW_MS = CONSTANTS.AUTH.RATE_LIMIT_WINDOW_MS;
const MAX_ATTEMPTS = CONSTANTS.AUTH.RATE_LIMIT_MAX_ATTEMPTS;

const hashEmail = async (email: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  waitSeconds: number;
}

export const checkRateLimitFirestore = async (email: string): Promise<RateLimitResult> => {
  try {
    const emailHash = await hashEmail(email);
    const docRef = doc(db, "rateLimits", emailHash);
    const docSnap = await getDoc(docRef);

    const now = Date.now();
    let attempts: number[] = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      attempts = (data.attempts || []).filter((timestamp: number) => now - timestamp < WINDOW_MS);
    }

    if (attempts.length >= MAX_ATTEMPTS) {
      const oldestAttempt = Math.min(...attempts);
      const waitMs = WINDOW_MS - (now - oldestAttempt);
      return {
        allowed: false,
        remainingAttempts: 0,
        waitSeconds: Math.ceil(waitMs / 1000),
      };
    }

    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS - attempts.length,
      waitSeconds: 0,
    };
  } catch {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS, waitSeconds: 0 };
  }
};

export const recordFailedAttemptFirestore = async (email: string): Promise<void> => {
  try {
    const emailHash = await hashEmail(email);
    const docRef = doc(db, "rateLimits", emailHash);
    const docSnap = await getDoc(docRef);

    const now = Date.now();
    let attempts: number[] = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      attempts = (data.attempts || []).filter((timestamp: number) => now - timestamp < WINDOW_MS);
    }

    attempts.push(now);

    await setDoc(
      docRef,
      {
        email: email,
        attempts: attempts.slice(-20),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    // Silently fail - don't block auth on rate limit write errors
  }
};

export const clearRateLimitFirestore = async (email: string): Promise<void> => {
  try {
    const emailHash = await hashEmail(email);
    const docRef = doc(db, "rateLimits", emailHash);

    await setDoc(
      docRef,
      {
        email: email,
        attempts: [],
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    // Silently fail
  }
};
