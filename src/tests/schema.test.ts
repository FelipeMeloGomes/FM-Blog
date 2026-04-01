import { describe, expect, it } from "vitest";
import {
  commentSchema,
  createPostSchema,
  editPostSchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "../schemas";

describe("loginSchema", () => {
  describe("given valid login data", () => {
    it("should validate correct email and password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("given invalid email", () => {
    const invalidEmails = [
      ["", "empty string"],
      ["invalid", "no @ symbol"],
      ["@example.com", "no local part"],
      ["test@", "no domain"],
      ["test@.com", "empty domain"],
    ] as const;

    it.each(invalidEmails)("should reject %s (%s)", (email) => {
      const result = loginSchema.safeParse({
        email,
        password: "password123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("given invalid password", () => {
    it("should reject empty password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("registerSchema", () => {
  const validPassword = "MyStr0ng@Pass!";
  const validData = {
    displayName: "John Doe",
    email: "test@example.com",
    password: validPassword,
    confirmPassword: validPassword,
  };

  describe("given valid registration data", () => {
    it("should validate correct data", () => {
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("given invalid displayName", () => {
    const invalidNames = [
      ["", "empty"],
      ["Jo", "too short"],
    ] as const;

    it.each(invalidNames)("should reject name: %s (%s)", (name) => {
      const result = registerSchema.safeParse({
        ...validData,
        displayName: name,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("given invalid password", () => {
    const invalidPasswords = [
      ["password123!", "no uppercase"],
      ["PASSWORD123!", "no lowercase"],
      ["Password123", "no special char"],
      ["Pass!", "no number"],
      ["pass1!", "too short"],
    ] as const;

    it.each(invalidPasswords)("should reject password: %s (%s)", (password) => {
      const result = registerSchema.safeParse({
        ...validData,
        password,
        confirmPassword: password,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("given password mismatch", () => {
    it("should reject when passwords don't match", () => {
      const result = registerSchema.safeParse({
        ...validData,
        confirmPassword: "Different123!",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("commentSchema", () => {
  describe("given valid comment", () => {
    it("should validate correct comment", () => {
      const result = commentSchema.safeParse({
        content: "This is a valid comment",
      });
      expect(result.success).toBe(true);
    });

    it("should validate comment at max length", () => {
      const result = commentSchema.safeParse({
        content: "a".repeat(500),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("given invalid comment", () => {
    const invalidCases = [
      ["", "empty string"],
      [null, "null value"],
    ] as const;

    it.each(invalidCases)("should reject: %s (%s)", (content) => {
      const result = commentSchema.safeParse({ content });
      expect(result.success).toBe(false);
    });

    it("should reject comment exceeding max length", () => {
      const result = commentSchema.safeParse({
        content: "a".repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("createPostSchema", () => {
  const validData = {
    title: "This is a valid post title",
    tagsInput: "react, typescript",
  };

  describe("given valid post data", () => {
    it("should validate correct post", () => {
      const result = createPostSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate title at min length", () => {
      const result = createPostSchema.safeParse({
        ...validData,
        title: "0123456789",
      });
      expect(result.success).toBe(true);
    });

    it("should validate title at max length", () => {
      const result = createPostSchema.safeParse({
        ...validData,
        title: "a".repeat(200),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("given invalid title", () => {
    const invalidTitles = [
      ["", "empty"],
      ["Short", "too short (5 chars)"],
      ["a".repeat(201), "too long (201 chars)"],
    ] as const;

    it.each(invalidTitles)("should reject title: %s (%s)", (title) => {
      const result = createPostSchema.safeParse({
        ...validData,
        title,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("given invalid tags", () => {
    it("should reject empty tags", () => {
      const result = createPostSchema.safeParse({
        ...validData,
        tagsInput: "",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("editPostSchema", () => {
  const validData = {
    title: "Updated post title here",
    tagsInput: "react, nextjs",
  };

  describe("given valid edit data", () => {
    it("should validate correct edit", () => {
      const result = editPostSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("given invalid title", () => {
    const invalidTitles = [
      ["", "empty"],
      ["Too short", "too short"],
    ] as const;

    it.each(invalidTitles)("should reject title: %s (%s)", (title) => {
      const result = editPostSchema.safeParse({
        ...validData,
        title,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("given invalid tags", () => {
    it("should reject empty tags", () => {
      const result = editPostSchema.safeParse({
        ...validData,
        tagsInput: "",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("profileSchema", () => {
  describe("given valid profile name", () => {
    it("should validate correct name", () => {
      const result = profileSchema.safeParse({ name: "John Doe" });
      expect(result.success).toBe(true);
    });

    it("should validate name at min length (3 chars)", () => {
      const result = profileSchema.safeParse({ name: "Joa" });
      expect(result.success).toBe(true);
    });

    it("should validate name at max length", () => {
      const result = profileSchema.safeParse({ name: "a".repeat(50) });
      expect(result.success).toBe(true);
    });
  });

  describe("given invalid profile name", () => {
    const invalidNames = [
      ["", "empty"],
      ["Jo", "too short (2 chars)"],
      [null, "null value"],
    ] as const;

    it.each(invalidNames)("should reject name: %s (%s)", (name) => {
      const result = profileSchema.safeParse({ name });
      expect(result.success).toBe(false);
    });

    it("should reject name exceeding max length", () => {
      const result = profileSchema.safeParse({ name: "a".repeat(51) });
      expect(result.success).toBe(false);
    });
  });
});
