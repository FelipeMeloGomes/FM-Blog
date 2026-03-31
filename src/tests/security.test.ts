import { beforeEach, describe, expect, it } from "vitest";
import {
  checkRateLimit,
  clearRateLimit,
  hasViewedPost,
  isCommonPassword,
  markPostAsViewed,
  recordFailedAttempt,
  sanitizeInput,
  sanitizeTag,
  validatePasswordStrength,
} from "../utils/security";

describe("sanitizeTag", () => {
  it("should lowercase and trim tags", () => {
    expect(sanitizeTag("  React  ")).toBe("react");
  });

  it("should remove HTML characters", () => {
    expect(sanitizeTag("<script>alert('xss')</script>")).toBe("scriptalert(xss)/script");
  });

  it("should remove javascript: protocol prefix and quotes", () => {
    const result = sanitizeTag("javascript:alert('xss')");
    expect(result).toBe("alert(xss)");
  });

  it("should remove event handler prefixes and quotes", () => {
    const result = sanitizeTag("onclick=alert('xss')");
    expect(result).toBe("alert(xss)");
  });

  it("should truncate to 30 characters", () => {
    expect(sanitizeTag("a".repeat(50))).toBe("a".repeat(30));
  });
});

describe("sanitizeInput", () => {
  it("should remove angle brackets", () => {
    expect(sanitizeInput("<script>")).toBe("script");
  });

  it("should remove javascript: protocol", () => {
    expect(sanitizeInput("javascript:alert(1)")).toBe("alert(1)");
  });

  it("should trim whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });
});

describe("isCommonPassword", () => {
  it("should return true for common passwords", () => {
    expect(isCommonPassword("password")).toBe(true);
    expect(isCommonPassword("123456")).toBe(true);
    expect(isCommonPassword("qwerty")).toBe(true);
  });

  it("should return false for non-common passwords", () => {
    expect(isCommonPassword("MySecureP@ssw0rd!")).toBe(false);
    expect(isCommonPassword("Xy7#kL9$mN")).toBe(false);
  });

  it("should be case insensitive", () => {
    expect(isCommonPassword("PASSWORD")).toBe(true);
    expect(isCommonPassword("Password")).toBe(true);
  });
});

describe("validatePasswordStrength", () => {
  it("should reject passwords less than 8 characters", () => {
    const result = validatePasswordStrength("Ab1!");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("pelo menos 8 caracteres");
  });

  it("should reject passwords without uppercase", () => {
    const result = validatePasswordStrength("password123!");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("maiúscula");
  });

  it("should reject passwords without lowercase", () => {
    const result = validatePasswordStrength("PASSWORD123!");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("minúscula");
  });

  it("should reject passwords without numbers", () => {
    const result = validatePasswordStrength("PasswordABC!");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("número");
  });

  it("should reject passwords without special characters", () => {
    const result = validatePasswordStrength("StrongPass123");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("caractere especial");
  });

  it("should reject common passwords (password1!)", () => {
    const result = validatePasswordStrength("password1!");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("muito comum");
  });

  it("should accept strong passwords", () => {
    const result = validatePasswordStrength("MyStr0ng@Pass!");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });
});

describe("hasViewedPost", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should return false for new posts", () => {
    expect(hasViewedPost("post123")).toBe(false);
  });

  it("should return true after marking as viewed", () => {
    markPostAsViewed("post123");
    expect(hasViewedPost("post123")).toBe(true);
  });
});

describe("rate limiting", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should allow first attempt", () => {
    const result = checkRateLimit("test@example.com");
    expect(result.allowed).toBe(true);
    expect(result.remainingAttempts).toBe(5);
  });

  it("should track failed attempts", () => {
    const email = "test@example.com";
    recordFailedAttempt(email);
    const result = checkRateLimit(email);
    expect(result.remainingAttempts).toBe(4);
  });

  it("should clear rate limit", () => {
    const email = "test@example.com";
    recordFailedAttempt(email);
    recordFailedAttempt(email);
    clearRateLimit(email);
    const result = checkRateLimit(email);
    expect(result.remainingAttempts).toBe(5);
  });
});
