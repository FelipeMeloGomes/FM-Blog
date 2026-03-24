import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  let ellipsisCount = 0;

  return (
    <HStack spacing={2} justify="center" wrap="wrap" mt={8} mb={8}>
      <IconButton
        aria-label="Página anterior"
        icon={<FiChevronLeft size={20} />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1 || isLoading}
        variant="outline"
        colorScheme="gray"
        size="md"
      />

      <HStack spacing={1}>
        {pageNumbers.map((page) => {
          if (page === "ellipsis") {
            ellipsisCount++;
            return (
              <Text key={`ellipsis-${ellipsisCount}-${page}`} px={2} color="gray.500">
                ...
              </Text>
            );
          }
          return (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "solid" : "ghost"}
              colorScheme={currentPage === page ? "blue" : "gray"}
              size="sm"
              minW="40px"
              isDisabled={isLoading}
            >
              {page}
            </Button>
          );
        })}
      </HStack>

      <IconButton
        aria-label="Próxima página"
        icon={<FiChevronRight size={20} />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages || isLoading}
        variant="outline"
        colorScheme="gray"
        size="md"
      />

      <Box display={{ base: "block", md: "none" }}>
        <Text fontSize="sm" color="gray.600">
          {currentPage} / {totalPages}
        </Text>
      </Box>
    </HStack>
  );
};

export { Pagination };
