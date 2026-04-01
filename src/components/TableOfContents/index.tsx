import { useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

let tocbotInitialized = false;

export const TableOfContents = () => {
  const initialized = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initialized.current) return;

    const init = () => {
      const content = document.querySelector(".post-content");
      if (!content) return;

      const headings = content.querySelectorAll("h1, h2, h3");
      if (headings.length === 0) return;

      headings.forEach((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || "";
          const id =
            text
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/--+/g, "-")
              .replace(/^-+/, "")
              .replace(/-+$/, "") || `heading-${index}`;
          heading.id = id;
        }
      });

      if (!tocbotInitialized) {
        tocbot.init({
          tocSelector: "#toc",
          contentSelector: ".post-content",
          headingSelector: "h1, h2, h3",
          orderedList: false,
          scrollSmooth: true,
          scrollSmoothDuration: 300,
          scrollSmoothOffset: -80,
          headingsOffset: 80,
        });
        tocbotInitialized = true;
      }

      initialized.current = true;
      setIsReady(true);
    };

    const timeoutId = setTimeout(init, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isReady) {
      const tocEl = document.getElementById("toc");
      const mobileEl = document.getElementById("toc-mobile");
      if (tocEl && mobileEl) {
        mobileEl.innerHTML = tocEl.innerHTML;
        const links = mobileEl.querySelectorAll("a");
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
      }
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <>
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

      <div className="hidden xl:block sticky top-24">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
          <div id="toc" />
        </div>
      </div>
    </>
  );
};
