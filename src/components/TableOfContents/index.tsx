import { useEffect, useState } from "react";

interface TableOfContentsProps {
  targetSelector?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const extractHeadings = () => {
      const content = document.querySelector(targetSelector);
      if (!content) return;

      const headings = content.querySelectorAll("h1, h2, h3");
      const items: TocItem[] = [];
      const usedIds = new Set<string>();

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const level = Number.parseInt(heading.tagName.charAt(1), 10);
        const text = heading.textContent || "";

        let id = heading.id;
        if (!id) {
          id =
            text
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/--+/g, "-")
              .replace(/^-+/, "")
              .replace(/-+$/, "") || `heading-${i}`;
          heading.id = id;
        }

        if (usedIds.has(id)) {
          id = `${id}-${i}`;
          heading.id = id;
        }
        usedIds.add(id);

        items.push({ id, text, level });
      }

      setTocItems(items);
    };

    extractHeadings();
  }, [targetSelector]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 p-4 bg-secondary/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <ul className="space-y-1">
          {tocItems.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              style={{ paddingLeft: item.level === 1 ? "0" : item.level === 2 ? "12px" : "24px" }}
            >
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TableOfContents };
