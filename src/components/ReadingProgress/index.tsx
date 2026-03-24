import { Box } from "@chakra-ui/react";
import { useReadingProgress } from "../../hooks/useReadingProgress";

const ReadingProgress = () => {
  const progress = useReadingProgress();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      zIndex={999}
      h="3px"
      bg="text.primary"
      w={`${progress}%`}
      transition="width 0.1s ease-out"
    />
  );
};

export { ReadingProgress };
