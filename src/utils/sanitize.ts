import DOMPurify from "dompurify";

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const addIdsToHeadings = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  let idCounter = 0;
  const headings = doc.querySelectorAll("h2, h3");

  for (const heading of headings) {
    const text = heading.textContent || "";
    let id = slugify(text);

    if (!id) {
      id = `heading-${idCounter++}`;
    }

    const existingElement = doc.getElementById(id);
    if (existingElement && existingElement !== heading) {
      id = `${id}-${idCounter++}`;
    }

    heading.id = id;
  }

  return doc.body.innerHTML;
};

export const sanitizeHtml = (html: string | TrustedHTML): string => {
  if (typeof window === "undefined") {
    return String(html);
  }

  const htmlString = String(html);
  const sanitized = DOMPurify.sanitize(htmlString, {
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
    ALLOWED_ATTR: ["href", "src", "alt", "class", "style", "target", "rel", "id"],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ["id"],
  });

  return addIdsToHeadings(sanitized);
};
