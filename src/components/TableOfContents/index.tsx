import { useEffect, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initTocbot = () => {
      tocbot.destroy();

      tocbot.init({
        tocSelector: "#toc-list",
        contentSelector: targetSelector,
        headingSelector: "h1, h2, h3",
        hasInnerContainers: true,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
        onClick: () => {
          return false;
        },
      });

      const tocElement = document.querySelector("#toc-list");
      if (tocElement) {
        const items = Array.from(tocElement.querySelectorAll("a")).map((link) => {
          const href = link.getAttribute("href") || "";
          const id = href.replace("#", "");
          const text = link.textContent || "";
          const level = link.closest("ol")?.closest("li")?.closest("ol")
            ? 3
            : link.closest("ol")
              ? 2
              : 1;
          return { id, text, level };
        });
        setTocItems(items);
        setIsVisible(items.length > 0);
      }
    };

    const timeoutId = setTimeout(initTocbot, 200);

    return () => {
      clearTimeout(timeoutId);
      tocbot.destroy();
    };
  }, [targetSelector]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!isVisible || tocItems.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 p-4 bg-secondary/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <nav id="toc-list" className="hidden" />
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
