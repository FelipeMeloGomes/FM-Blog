import { Box, Link, Text, VStack } from "@chakra-ui/react";
import type { Heading } from "../../hooks/useTableOfContents";

interface TableOfContentsProps {
  headings: Heading[];
  activeId?: string;
}

const TableOfContents = ({ headings, activeId }: TableOfContentsProps) => {
  if (headings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box display={{ base: "none", xl: "block" }} position="sticky" top={8} maxW="200px">
      <VStack align="start" spacing={1}>
        <Text
          fontSize="xs"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing="wider"
          color="text.secondary"
          mb={3}
        >
          Neste post
        </Text>
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <Link
              key={heading.id}
              display="block"
              fontSize="sm"
              color={isActive ? "text.primary" : "text.secondary"}
              fontWeight={isActive ? "500" : "normal"}
              borderLeft={isActive ? "2px solid" : "none"}
              borderColor="text.primary"
              pl={isActive ? 2 : heading.level === 3 ? 3 : 0}
              onClick={() => scrollToHeading(heading.id)}
              cursor="pointer"
              transition="color 0.15s"
              _hover={{ color: "text.primary" }}
            >
              {heading.text}
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export { TableOfContents };
