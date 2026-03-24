interface Heading {
  id: string;
  text: string;
  level: number;
}

const useTableOfContents = (content: string): Heading[] => {
  const headings: Heading[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  let match: RegExpExecArray | null = regex.exec(content);

  while (match !== null) {
    const level = Number.parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text, level });
    match = regex.exec(content);
  }

  return headings;
};

export { useTableOfContents };
export type { Heading };
