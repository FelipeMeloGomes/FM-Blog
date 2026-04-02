import { FiFilter, FiX } from "react-icons/fi";
import type { AdvancedFiltersProps, AdvancedFiltersState } from "./types";

const AdvancedFilters = ({ filters, onChange }: AdvancedFiltersProps) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sortBy: e.target.value as AdvancedFiltersState["sortBy"] });
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, author: e.target.value });
  };

  const clearFilters = () => {
    onChange({ sortBy: "newest", author: "" });
  };

  const hasActiveFilters = filters.sortBy !== "newest" || filters.author !== "";

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-secondary/30 rounded-xl p-4 border border-border/50">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FiFilter size={18} />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      <div className="flex flex-wrap gap-3 flex-1">
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="h-10 px-4 rounded-lg border border-input bg-background text-sm w-full sm:w-auto"
        >
          <option value="newest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="mostLiked">Mais curtidos</option>
        </select>

        <input
          type="text"
          placeholder="Filtrar por autor..."
          value={filters.author}
          onChange={handleAuthorChange}
          className="h-10 px-4 rounded-lg border border-input bg-background text-sm w-full sm:w-48"
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          <FiX size={14} />
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export { AdvancedFilters };
