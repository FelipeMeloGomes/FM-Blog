import { useEffect, useRef } from "react";
import tocbot from "tocbot";
import "tocbot/dist/tocbot.css";

export const TableOfContents = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    tocbot.init({
      tocSelector: "#toc",
      contentSelector: ".post-content",
      headingSelector: "h1, h2, h3",
      orderedList: false,
      scrollSmooth: true,
      scrollSmoothDuration: 300,
    });

    initialized.current = true;
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
