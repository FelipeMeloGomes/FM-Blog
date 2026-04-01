import { useCallback, useEffect, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

export const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [items, setItems] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addIdsToHeadings = useCallback((container: Element) => {
    const headings = container.querySelectorAll("h1, h2, h3");
    const usedIds = new Set<string>();

    headings.forEach((heading, index) => {
      if (heading.id) {
        return;
      }

      let id = heading.textContent || "";
      id =
        id
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "") || `heading-${index}`;

      if (usedIds.has(id)) {
        id = `${id}-${index}`;
      }

      heading.id = id;
      usedIds.add(id);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const init = () => {
      const content = document.querySelector(targetSelector);
      if (!content) {
        return;
      }

      addIdsToHeadings(content);

      const headings = content.querySelectorAll("h1, h2, h3");
      if (headings.length === 0) {
        return;
      }

      tocbot.destroy();

      tocbot.init({
        tocSelector: "#toc-list",
        contentSelector: targetSelector,
        headingSelector: "h1, h2, h3",
        hasInnerContainers: false,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -100,
        headingsOffset: 100,
      });

      const tocElement = document.querySelector("#toc-list");
      if (tocElement) {
        const links = tocElement.querySelectorAll("a");
        const newItems: Array<{ id: string; text: string; level: number }> = [];

        for (const link of links) {
          const href = link.getAttribute("href") || "";
          const id = href.replace("#", "");
          const text = link.textContent || "";
          const level = link.closest("ol")?.closest("li")?.closest("ol") ? 3 : 2;
          newItems.push({ id, text, level });
        }

        setItems(newItems);
      }
    };

    const timeoutId = setTimeout(init, 200);

    return () => {
      clearTimeout(timeoutId);
      tocbot.destroy();
    };
  }, [targetSelector, mounted, addIdsToHeadings]);

  if (!mounted || items.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block sticky top-24">
      <div className="p-4 bg-secondary/50 rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <div id="toc-list" />
      </div>
    </div>
  );
};

export const TableOfContentsSidebar = () => null;
