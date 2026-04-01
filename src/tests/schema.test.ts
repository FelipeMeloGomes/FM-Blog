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
  it("should validate a correct login", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("should validate a correct registration", () => {
    const result = registerSchema.safeParse({
      displayName: "John Doe",
      email: "test@example.com",
      password: "MyStr0ng@Pass!",
      confirmPassword: "MyStr0ng@Pass!",
    });
    expect(result.success).toBe(true);
  });

  it("should reject short display name", () => {
    const result = registerSchema.safeParse({
      displayName: "Jo",
      email: "test@example.com",
      password: "MyStr0ng@Pass!",
      confirmPassword: "MyStr0ng@Pass!",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without uppercase", () => {
    const result = registerSchema.safeParse({
      displayName: "John Doe",
      email: "test@example.com",
      password: "password123!",
      confirmPassword: "password123!",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without lowercase", () => {
    const result = registerSchema.safeParse({
      displayName: "John Doe",
      email: "test@example.com",
      password: "PASSWORD123!",
      confirmPassword: "PASSWORD123!",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without number", () => {
    const result = registerSchema.safeParse({
      displayName: "John Doe",
      email: "test@example.com",
      password: "PasswordABC!",
      confirmPassword: "PasswordABC!",
    });
    expect(result.success).toBe(false);
  });

  it("should reject password without special char", () => {
    const result = registerSchema.safeParse({
      displayName: "John Doe",
      email: "test@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject mismatched passwords", () => {
    const result = registerSchema.safeParse({
      displayName: "John Doe",
      email: "test@example.com",
      password: "MyStr0ng@Pass!",
      confirmPassword: "Different123!",
    });
    expect(result.success).toBe(false);
  });
});

describe("commentSchema", () => {
  it("should validate a correct comment", () => {
    const result = commentSchema.safeParse({
      content: "This is a valid comment",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty comment", () => {
    const result = commentSchema.safeParse({
      content: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject comment exceeding max length", () => {
    const result = commentSchema.safeParse({
      content: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });
});

describe("createPostSchema", () => {
  it("should validate a correct post", () => {
    const result = createPostSchema.safeParse({
      title: "This is a valid post title",
      tagsInput: "react, typescript",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty title", () => {
    const result = createPostSchema.safeParse({
      title: "",
      tagsInput: "react",
    });
    expect(result.success).toBe(false);
  });

  it("should reject title with less than 10 characters", () => {
    const result = createPostSchema.safeParse({
      title: "Short",
      tagsInput: "react",
    });
    expect(result.success).toBe(false);
  });

  it("should reject title with more than 200 characters", () => {
    const result = createPostSchema.safeParse({
      title: "a".repeat(201),
      tagsInput: "react",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty tags", () => {
    const result = createPostSchema.safeParse({
      title: "Valid post title here",
      tagsInput: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("editPostSchema", () => {
  it("should validate a correct edit", () => {
    const result = editPostSchema.safeParse({
      title: "Updated post title here",
      tagsInput: "react, nextjs",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty title", () => {
    const result = editPostSchema.safeParse({
      title: "",
      tagsInput: "react",
    });
    expect(result.success).toBe(false);
  });

  it("should reject title with less than 10 characters", () => {
    const result = editPostSchema.safeParse({
      title: "Too short",
      tagsInput: "react",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty tags", () => {
    const result = editPostSchema.safeParse({
      title: "Valid updated title here",
      tagsInput: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("profileSchema", () => {
  it("should validate a correct profile name", () => {
    const result = profileSchema.safeParse({
      name: "John Doe",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const result = profileSchema.safeParse({
      name: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject name with less than 3 characters", () => {
    const result = profileSchema.safeParse({
      name: "Jo",
    });
    expect(result.success).toBe(false);
  });

  it("should reject name with more than 50 characters", () => {
    const result = profileSchema.safeParse({
      name: "a".repeat(51),
    });
    expect(result.success).toBe(false);
  });
});
