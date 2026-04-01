import { useEffect, useRef } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

interface TableOfContentsProps {
  targetSelector?: string;
}

const TableOfContents = ({ targetSelector = ".post-content" }: TableOfContentsProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    tocbot.init({
      tocSelector: ".toc",
      contentSelector: targetSelector,
      headingSelector: "h2, h3",
      hasInnerContainers: true,
      orderedList: false,
      scrollSmooth: true,
      scrollSmoothDuration: 300,
      scrollSmoothOffset: -80,
      headingsOffset: 80,
    });

    initialized.current = true;

    return () => {
      tocbot.destroy();
    };
  }, [targetSelector]);

  return (
    <div className="hidden xl:block">
      <div className="toc sticky top-24 p-4 bg-secondary/50 rounded-lg" />
    </div>
  );
};

export { TableOfContents };
