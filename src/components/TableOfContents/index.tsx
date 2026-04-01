import { useCallback, useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const initialized = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasHeadings, setHasHeadings] = useState(false);

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
      setHasHeadings(headings.length > 0);

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

  if (!hasHeadings) {
    return null;
  }

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
        .toc-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: hsl(var(--secondary));
          border-radius: 0.5rem;
          cursor: pointer;
          width: 100%;
          border: none;
          text-align: left;
        }
        .toc-toggle:hover {
          background: hsl(var(--secondary) / 0.8);
        }
        .toc-content {
          padding: 1rem;
          background: hsl(var(--secondary) / 0.3);
          border-radius: 0 0 0.5rem 0.5rem;
          margin-top: -0.25rem;
        }
      `}</style>

      <div className="mb-6 xl:hidden">
        <button type="button" className="toc-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-sm font-medium">Índice</span>
          <span className="text-muted-foreground">{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <div className="toc-content">
            <div id="toc-list" />
          </div>
        )}
      </div>

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
