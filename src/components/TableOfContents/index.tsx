import { useCallback, useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

export const TableOfContents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
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
    if (initialized.current) {
      return;
    }

    const init = () => {
      const content = document.querySelector(".post-content");
      if (!content) {
        return;
      }

      addIdsToHeadings(content);

      const headings = content.querySelectorAll("h1, h2, h3");
      if (headings.length === 0) {
        return;
      }

      tocbot.init({
        tocSelector: "#toc",
        contentSelector: ".post-content",
        headingSelector: "h1, h2, h3",
        hasInnerContainers: false,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
      });

      initialized.current = true;
      setIsReady(true);
    };

    const timeoutId = setTimeout(init, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [addIdsToHeadings]);

  useEffect(() => {
    if (isReady && initialized.current) {
      const tocEl = document.getElementById("toc");
      const mobileEl = document.getElementById("toc-mobile");
      const sidebarEl = document.getElementById("toc-sidebar");

      if (tocEl && mobileEl && sidebarEl) {
        const clone = tocEl.innerHTML;
        mobileEl.innerHTML = clone;
        sidebarEl.innerHTML = clone;

        const copyLinks = (container: HTMLElement) => {
          const links = container.querySelectorAll("a");
          for (const link of links) {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              const href = link.getAttribute("href");
              if (href) {
                const id = href.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                  const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }
            });
          }
        };

        copyLinks(mobileEl);
        copyLinks(sidebarEl);
      }
    }
  }, [isReady]);

  useEffect(() => {
    return () => {
      if (initialized.current) {
        tocbot.destroy();
        initialized.current = false;
      }
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <div id="toc" className="hidden" />

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

      <div className="hidden xl:block sticky top-24 p-4 bg-secondary/50 rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <div id="toc-sidebar" />
      </div>
    </>
  );
};

export const TableOfContentsSidebar = () => null;
