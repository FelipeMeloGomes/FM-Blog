import { useEffect, useRef } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

export const TableOfContents = () => {
  const initialized = useRef(false);

  useEffect(() => {
    const init = () => {
      if (initialized.current) return;

      const content = document.querySelector(".post-content");
      if (!content) return;

      const headings = content.querySelectorAll("h2, h3");
      if (headings.length === 0) return;

      const usedIds = new Set<string>();
      headings.forEach((heading, index) => {
        if (heading.id) return;
        let id =
          (heading.textContent || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "") || `heading-${index}`;
        if (usedIds.has(id)) id = `${id}-${index}`;
        heading.id = id;
        usedIds.add(id);
      });

      tocbot.init({
        tocSelector: "#toc",
        contentSelector: ".post-content",
        headingSelector: "h2, h3",
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
      });

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

export const TableOfContentsSidebar = () => null;
