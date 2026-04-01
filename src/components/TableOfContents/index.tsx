import { useEffect, useRef } from "react";
import tocbot from "tocbot";

let tocbotInitialized = false;

export const TableOfContents = () => {
  const initialized = useRef(false);

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
        });
        tocbotInitialized = true;
      }

      initialized.current = true;
    };

    const timeoutId = setTimeout(init, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="hidden xl:block sticky top-24">
      <div className="p-4 bg-secondary/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <div id="toc" />
      </div>
    </div>
  );
};
