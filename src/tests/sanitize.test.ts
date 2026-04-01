import { describe, expect, it } from "vitest";

const sanitizeHtml = (html: string): string => {
  const allowedTags = [
    "b",
    "i",
    "em",
    "strong",
    "u",
    "p",
    "br",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "a",
    "img",
    "span",
    "div",
  ];

  const stripScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  const stripEventHandlers = stripScripts.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  const stripDangerousProtocols = stripEventHandlers.replace(/javascript:/gi, "");
  const stripDataAttrs = stripDangerousProtocols.replace(/\s*data-\w+\s*=\s*["'][^"']*["']/gi, "");

  let result = stripDataAttrs;

  for (const tag of allowedTags) {
    const regex = new RegExp(`</?${tag}[^>]*>`, "gi");
    result = result.replace(regex, (match) => match);
  }

  const allTags = result.match(/<\/?[a-z][a-z0-9]*/gi) || [];
  for (const tagMatch of allTags) {
    const tagName = tagMatch.replace(/<\/?/, "").toLowerCase();
    if (!allowedTags.includes(tagName)) {
      const tagRegex = new RegExp(`</?${tagMatch.slice(1)}[^>]*>`, "gi");
      result = result.replace(tagRegex, "");
    }
  }

  return result;
};

describe("sanitizeHtml", () => {
  it("should preserve allowed HTML tags", () => {
    const html = "<p>Hello <strong>world</strong></p>";
    const result = sanitizeHtml(html);
    expect(result).toContain("<p>");
    expect(result).toContain("<strong>");
    expect(result).toContain("</strong>");
    expect(result).toContain("</p>");
  });

  it("should preserve h1, h2, h3 tags", () => {
    const html = "<h1>Title</h1><h2>Subtitle</h2><h3>Heading</h3>";
    const result = sanitizeHtml(html);
    expect(result).toContain("<h1>Title</h1>");
    expect(result).toContain("<h2>Subtitle</h2>");
    expect(result).toContain("<h3>Heading</h3>");
  });

  it("should remove script tags", () => {
    const html = "<p>Hello</p><script>alert('xss')</script>";
    const result = sanitizeHtml(html);
    expect(result).not.toContain("<script>");
    expect(result).not.toContain("alert");
  });

  it("should remove event handlers", () => {
    const html = "<p onclick='alert(1)'>Click me</p>";
    const result = sanitizeHtml(html);
    expect(result).not.toContain("onclick");
  });

  it("should remove javascript: protocol", () => {
    const html = "<a href='javascript:alert(1)'>Link</a>";
    const result = sanitizeHtml(html);
    expect(result).not.toContain("javascript:");
  });

  it("should preserve links with href", () => {
    const html = "<a href='https://example.com'>Link</a>";
    const result = sanitizeHtml(html);
    expect(result).toContain("href='https://example.com'");
  });

  it("should preserve img tags with src", () => {
    const html = "<img src='image.jpg' alt='test' />";
    const result = sanitizeHtml(html);
    expect(result).toContain("src='image.jpg'");
  });

  it("should preserve lists (ul, ol, li)", () => {
    const html = "<ul><li>Item 1</li><li>Item 2</li></ul>";
    const result = sanitizeHtml(html);
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>Item 1</li>");
  });

  it("should preserve blockquote and code", () => {
    const html = "<blockquote>Quote</blockquote><code>console.log()</code>";
    const result = sanitizeHtml(html);
    expect(result).toContain("<blockquote>Quote</blockquote>");
    expect(result).toContain("<code>console.log()</code>");
  });

  it("should preserve text content", () => {
    const html = "<p>Simple text content</p>";
    const result = sanitizeHtml(html);
    expect(result).toContain("Simple text content");
  });

  it("should handle empty string", () => {
    const result = sanitizeHtml("");
    expect(result).toBe("");
  });

  it("should handle text without HTML", () => {
    const html = "Just plain text without any HTML tags";
    const result = sanitizeHtml(html);
    expect(result).toBe(html);
  });
});
