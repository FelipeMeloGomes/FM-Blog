import { useEffect, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tocbot.destroy();

      tocbot.init({
        tocSelector: "#toc-target",
        contentSelector: targetSelector,
        headingSelector: "h1, h2, h3",
        hasInnerContainers: true,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -80,
        headingsOffset: 80,
      });

      const tocElement = document.querySelector("#toc-target");
      if (tocElement) {
        const links = tocElement.querySelectorAll("a");
        const items: TocItem[] = [];

        for (const link of links) {
          const href = link.getAttribute("href") || "";
          const id = href.replace("#", "");
          const text = link.textContent || "";
          const isH1 = link.closest("ol")?.closest("ol")?.previousElementSibling?.tagName === "H1";
          const level = isH1 ? 1 : 2;
          items.push({ id, text, level });
        }

        setTocItems(items);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      tocbot.destroy();
    };
  }, [targetSelector]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 p-4 bg-secondary/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Índice</h3>
        <div id="toc-target" className="hidden" />
        <ul className="space-y-1">
          {tocItems.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              style={{ paddingLeft: item.level === 1 ? "0" : "12px" }}
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
