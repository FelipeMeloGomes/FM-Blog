export interface AdvancedFiltersState {
  sortBy: "newest" | "oldest" | "mostLiked";
  author: string;
}

export interface AdvancedFiltersProps {
  filters: AdvancedFiltersState;
  onChange: (filters: AdvancedFiltersState) => void;
}
