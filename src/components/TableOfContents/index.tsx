import { useCallback, useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

export const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialized = useRef(false);

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
        tocSelector: "#toc-mobile",
        contentSelector: targetSelector,
        headingSelector: "h1, h2, h3",
        hasInnerContainers: false,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
      });

      initialized.current = true;
    };

    const timeoutId = setTimeout(init, 100);

    return () => {
      clearTimeout(timeoutId);
      if (initialized.current) {
        tocbot.destroy();
        initialized.current = false;
      }
    };
  }, [targetSelector, addIdsToHeadings]);

  return (
    <div className="xl:hidden mb-4">
      <button
        type="button"
        className="flex items-center justify-between w-full p-3 bg-secondary rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">Índice</span>
        <span className="text-muted-foreground">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 p-3 bg-secondary/50 rounded-lg">
          <div id="toc-mobile" />
        </div>
      )}
    </div>
  );
};

export const TableOfContentsSidebar = ({
  targetSelector = ".post-content",
}: TableOfContentsProps) => {
  const initialized = useRef(false);

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
        tocSelector: "#toc-sidebar",
        contentSelector: targetSelector,
        headingSelector: "h1, h2, h3",
        hasInnerContainers: false,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
      });

      initialized.current = true;
    };

    const timeoutId = setTimeout(init, 100);

    return () => {
      clearTimeout(timeoutId);
      if (initialized.current) {
        tocbot.destroy();
        initialized.current = false;
      }
    };
  }, [targetSelector, addIdsToHeadings]);

  return (
    <div className="hidden xl:block sticky top-24">
      <div className="p-4 bg-secondary/50 rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <div id="toc-sidebar" />
      </div>
    </div>
  );
};
