import { CONSTANTS } from "./constants";

const COMMON_PASSWORDS = [
  "password",
  "password1",
  "password1!",
  "123456",
  "12345678",
  "1234567",
  "123456789",
  "1234567890",
  "qwerty",
  "qwerty123",
  "abc123",
  "monkey",
  "letmein",
  "trustno1",
  "dragon",
  "baseball",
  "iloveyou",
  "master",
  "sunshine",
  "ashley",
  "bailey",
  "shadow",
  "123123",
  "654321",
  "superman",
  "qazwsx",
  "michael",
  "football",
  "password123",
  "password12",
  "welcome",
  "welcome1",
  "admin",
  "login",
  "passw0rd",
  "hello",
  "charlie",
  "donald",
  "1234",
  "pass",
  "test",
  "guest",
];

const STORAGE_KEY = "fm_blog_viewed_posts";
const RATE_LIMIT_KEY = "fm_blog_auth_attempts";

export const sanitizeTag = (tag: string): string => {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[<>\"'&]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .slice(0, CONSTANTS.VALIDATION.TAG_MAX_LENGTH);
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
};

export const isCommonPassword = (password: string): boolean => {
  return COMMON_PASSWORDS.includes(password.toLowerCase());
};

export const hasViewedPost = (postId: string): boolean => {
  try {
    const viewed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    const now = Date.now();

    for (const [id, timestamp] of Object.entries(viewed)) {
      if (typeof timestamp === "number" && now - timestamp > CONSTANTS.AUTH.VIEW_LIMIT_WINDOW_MS) {
        delete viewed[id];
      }
    }

    return !!viewed[postId];
  } catch {
    return false;
  }
};

export const markPostAsViewed = (postId: string): void => {
  try {
    const viewed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    viewed[postId] = Date.now();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
  } catch {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ [postId]: Date.now() }));
  }
};

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  waitSeconds: number;
}

export const checkRateLimit = (email: string): RateLimitResult => {
  try {
    const attempts = JSON.parse(localStorage.getItem(`${RATE_LIMIT_KEY}_${email}`) || "{}");
    const now = Date.now();

    for (const [timestamp] of Object.entries(attempts)) {
      if (now - Number.parseInt(timestamp) > CONSTANTS.AUTH.RATE_LIMIT_WINDOW_MS) {
        delete attempts[timestamp];
      }
    }

    const validAttempts = Object.keys(attempts).length;

    if (validAttempts >= CONSTANTS.AUTH.RATE_LIMIT_MAX_ATTEMPTS) {
      const oldestAttempt = Math.min(...Object.keys(attempts).map(Number));
      const waitMs = CONSTANTS.AUTH.RATE_LIMIT_WINDOW_MS - (now - oldestAttempt);
      return {
        allowed: false,
        remainingAttempts: 0,
        waitSeconds: Math.ceil(waitMs / 1000),
      };
    }

    return {
      allowed: true,
      remainingAttempts: CONSTANTS.AUTH.RATE_LIMIT_MAX_ATTEMPTS - validAttempts,
      waitSeconds: 0,
    };
  } catch {
    return {
      allowed: true,
      remainingAttempts: CONSTANTS.AUTH.RATE_LIMIT_MAX_ATTEMPTS,
      waitSeconds: 0,
    };
  }
};

export const recordFailedAttempt = (email: string): void => {
  try {
    const attempts = JSON.parse(localStorage.getItem(`${RATE_LIMIT_KEY}_${email}`) || "{}");
    attempts[Date.now()] = true;

    const now = Date.now();
    for (const [timestamp] of Object.entries(attempts)) {
      if (now - Number.parseInt(timestamp) > CONSTANTS.AUTH.RATE_LIMIT_WINDOW_MS) {
        delete attempts[timestamp];
      }
    }

    localStorage.setItem(`${RATE_LIMIT_KEY}_${email}`, JSON.stringify(attempts));
  } catch {
    localStorage.setItem(`${RATE_LIMIT_KEY}_${email}`, JSON.stringify({ [Date.now()]: true }));
  }
};

export const clearRateLimit = (email: string): void => {
  localStorage.removeItem(`${RATE_LIMIT_KEY}_${email}`);
};
