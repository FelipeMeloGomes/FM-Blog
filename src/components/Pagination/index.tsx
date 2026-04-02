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

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1.5 pt-6">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="p-2.5 rounded-lg border border-input bg-background hover:bg-secondary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:border-primary/30"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) =>
          page === "ellipsis" ? (
            <span key="ellipsis" className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`h-9 min-w-[36px] px-3 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                currentPage === page
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-input bg-background hover:bg-secondary/50 hover:border-primary/30"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="p-2.5 rounded-lg border border-input bg-background hover:bg-secondary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:border-primary/30"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export { Pagination };
