import { useEffect, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [items, setItems] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      tocbot.destroy();

      tocbot.init({
        tocSelector: "#toc-list",
        contentSelector: targetSelector,
        headingSelector: "h2, h3",
        hasInnerContainers: true,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -100,
        headingsOffset: 100,
        onClick: (e) => {
          e.preventDefault();
          const href = (e.target as HTMLElement).getAttribute("href");
          if (href) {
            const id = href.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
              const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }
        },
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
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      tocbot.destroy();
    };
  }, [targetSelector, mounted]);

  if (!mounted || items.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 p-4 bg-secondary/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <div id="toc-list" />
      </div>
    </div>
  );
};

export { TableOfContents };
