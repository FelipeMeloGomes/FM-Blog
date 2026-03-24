import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string | TrustedHTML): string => {
  if (typeof window === "undefined") {
    return String(html);
  }

  const htmlString = String(html);
  return DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [
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
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "class", "style", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  });
};
