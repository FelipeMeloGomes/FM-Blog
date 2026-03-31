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

export const sanitizeTag = (tag: string): string => {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[<>\"'&]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .slice(0, 30);
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

export const validatePasswordStrength = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: "A senha deve ter pelo menos 8 caracteres" };
  }

  if (isCommonPassword(password)) {
    return { valid: false, message: "Esta senha é muito comum. Escolha uma senha mais segura" };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra maiúscula" };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra minúscula" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos um número" };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos um caractere especial (!@#$%^&*...)",
    };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra minúscula" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos um número" };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos um caractere especial (!@#$%^&*...)",
    };
  }

  if (isCommonPassword(password)) {
    return { valid: false, message: "Esta senha é muito comum. Escolha uma senha mais segura" };
  }

  return { valid: true, message: "" };
};

const STORAGE_KEY = "fm_blog_viewed_posts";
const RATE_LIMIT_KEY = "fm_blog_auth_attempts";
const VIEW_LIMIT_WINDOW = 24 * 60 * 60 * 1000;

export const hasViewedPost = (postId: string): boolean => {
  try {
    const viewed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    const now = Date.now();

    for (const [id, timestamp] of Object.entries(viewed)) {
      if (typeof timestamp === "number" && now - timestamp > VIEW_LIMIT_WINDOW) {
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

const MAX_AUTH_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

export const checkRateLimit = (email: string): RateLimitResult => {
  try {
    const attempts = JSON.parse(localStorage.getItem(`${RATE_LIMIT_KEY}_${email}`) || "{}");
    const now = Date.now();

    for (const [timestamp] of Object.entries(attempts)) {
      if (now - Number.parseInt(timestamp) > RATE_LIMIT_WINDOW) {
        delete attempts[timestamp];
      }
    }

    const validAttempts = Object.keys(attempts).length;

    if (validAttempts >= MAX_AUTH_ATTEMPTS) {
      const oldestAttempt = Math.min(...Object.keys(attempts).map(Number));
      const waitMs = RATE_LIMIT_WINDOW - (now - oldestAttempt);
      return {
        allowed: false,
        remainingAttempts: 0,
        waitSeconds: Math.ceil(waitMs / 1000),
      };
    }

    return {
      allowed: true,
      remainingAttempts: MAX_AUTH_ATTEMPTS - validAttempts,
      waitSeconds: 0,
    };
  } catch {
    return { allowed: true, remainingAttempts: MAX_AUTH_ATTEMPTS, waitSeconds: 0 };
  }
};

export const recordFailedAttempt = (email: string): void => {
  try {
    const attempts = JSON.parse(localStorage.getItem(`${RATE_LIMIT_KEY}_${email}`) || "{}");
    attempts[Date.now()] = true;

    const now = Date.now();
    for (const [timestamp] of Object.entries(attempts)) {
      if (now - Number.parseInt(timestamp) > RATE_LIMIT_WINDOW) {
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

export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};
