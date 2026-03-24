import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

interface AnimatedPageProps {
  children: React.ReactNode;
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
