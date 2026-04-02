import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const MotionDiv = motion.div;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionDiv
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 99,
          }}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <FiArrowUp className="h-5 w-5" />
          </button>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export { ScrollToTop };
