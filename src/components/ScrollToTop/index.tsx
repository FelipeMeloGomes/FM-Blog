import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <Tooltip label="Voltar ao topo" hasArrow>
            <IconButton
              aria-label="Voltar ao topo"
              icon={<ArrowUpIcon />}
              borderRadius="full"
              size="md"
              bg="text.primary"
              color="bg.primary"
              _hover={{ bg: "gray.700" }}
              onClick={scrollToTop}
            />
          </Tooltip>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export { ScrollToTop };
