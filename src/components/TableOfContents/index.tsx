import { useCallback, useEffect, useRef } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
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
        tocSelector: "#toc-list",
        contentSelector: targetSelector,
        headingSelector: "h1, h2, h3",
        hasInnerContainers: false,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
        ignoreSelector: ".toc-ignore",
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
    <>
      <style>{`
        #toc-list .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        #toc-list .toc-list-item {
          margin: 4px 0;
        }
        #toc-list .toc-list-item a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        #toc-list .toc-list-item a:hover {
          color: #1e293b;
        }
        #toc-list .toc-list-item .toc-list {
          padding-left: 1rem;
        }
      `}</style>
      <div className="hidden xl:block">
        <div className="sticky top-24 p-4 bg-secondary/50 rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
          <div id="toc-list" />
        </div>
      </div>
    </>
  );
};

export { TableOfContents };
