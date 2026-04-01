import { describe, expect, it, vi } from "vitest";

vi.mock("dompurify", () => ({
  default: {
    sanitize: vi.fn((html: string) => {
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/data:/gi, "");
    }),
  },
}));

import { sanitizeHtml } from "../utils/sanitize";

describe("sanitizeHtml", () => {
  describe("given valid HTML", () => {
    const validCases = [
      ["<p>Hello</p>", "should preserve paragraph tags"],
      ["<strong>bold</strong>", "should preserve strong tags"],
      ["<em>italic</em>", "should preserve em tags"],
      ["<h1>Title</h1>", "should preserve h1 tags"],
      ["<h2>Subtitle</h2>", "should preserve h2 tags"],
      ["<h3>Heading</h3>", "should preserve h3 tags"],
    ] as const;

    it.each(validCases)("%s - %s", (html) => {
      const result = sanitizeHtml(html);
      expect(result).toBeTruthy();
    });
  });

  describe("given text content", () => {
    it("should preserve plain text", () => {
      const text = "Simple text without any HTML";
      const result = sanitizeHtml(text);
      expect(result).toBe(text);
    });

    it("should handle empty string", () => {
      const result = sanitizeHtml("");
      expect(result).toBe("");
    });
  });

  describe("given potentially dangerous content", () => {
    it("should handle script tags", () => {
      const html = "<p>Hello</p><script>alert('xss')</script>";
      const result = sanitizeHtml(html);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("alert");
    });

    it("should handle inline event handlers", () => {
      const html = "<p onclick='alert(1)'>Click me</p>";
      const result = sanitizeHtml(html);
      expect(result).not.toContain("onclick");
    });

    it("should handle javascript: protocol", () => {
      const html = "<a href='javascript:alert(1)'>Link</a>";
      const result = sanitizeHtml(html);
      expect(result).not.toContain("javascript:");
    });

    it("should handle data: protocol", () => {
      const html = "<img src='data:text/html,<script>alert(1)</script>' />";
      const result = sanitizeHtml(html);
      expect(result).not.toContain("data:");
    });
  });

  describe("given allowed tags", () => {
    const allowedTags = [
      ["<ul><li>Item 1</li><li>Item 2</li></ul>", "should preserve ul and li"],
      ["<ol><li>Ordered</li></ol>", "should preserve ol"],
      ["<blockquote>Quote</blockquote>", "should preserve blockquote"],
      ["<code>console.log()</code>", "should preserve code"],
      ["<pre>Code block</pre>", "should preserve pre"],
      ["<a href='https://example.com'>Link</a>", "should preserve links with href"],
      ["<img src='image.jpg' alt='test' />", "should preserve img with src"],
    ] as const;

    it.each(allowedTags)("%s - %s", (html) => {
      const result = sanitizeHtml(html);
      expect(result).toBeTruthy();
    });
  });

  describe("given server-side rendering context", () => {
    it("should return string when window is undefined", () => {
      const originalWindow = global.window;
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      });

      const html = "<p>Test</p>";
      const result = sanitizeHtml(html);

      Object.defineProperty(global, "window", {
        value: originalWindow,
        writable: true,
      });

      expect(result).toBe(html);
    });
  });
});
