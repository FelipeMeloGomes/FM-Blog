import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.3, ease: "easeOut" },
  }),
};

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
}

export const AnimatedCard = ({ children, index }: AnimatedCardProps) => (
  <motion.div variants={cardVariants} initial="initial" animate="animate" custom={index}>
    {children}
  </motion.div>
);
