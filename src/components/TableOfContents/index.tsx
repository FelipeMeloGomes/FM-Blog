import { useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || initialized.current) return;

    const initTocbot = () => {
      const content = document.querySelector(targetSelector);
      if (!content) {
        setTimeout(initTocbot, 100);
        return;
      }

      const headings = content.querySelectorAll("h2, h3");
      if (headings.length === 0) {
        return;
      }

      tocbot.destroy();
      tocbot.init({
        tocSelector: "#toc-list",
        contentSelector: targetSelector,
        headingSelector: "h2, h3",
        hasInnerContainers: false,
        orderedList: false,
        scrollSmooth: true,
        scrollSmoothDuration: 300,
        scrollSmoothOffset: -100,
        headingsOffset: 100,
      });

      initialized.current = true;
    };

    const timeoutId = setTimeout(initTocbot, 500);

    return () => {
      clearTimeout(timeoutId);
      tocbot.destroy();
    };
  }, [isReady, targetSelector]);

  useEffect(() => {
    return () => {
      tocbot.destroy();
      initialized.current = false;
    };
  }, []);

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
