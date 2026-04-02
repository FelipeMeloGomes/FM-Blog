import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usePopularTags } from "../../hooks/usePopularTags";
import type { SearchFormProps } from "./types";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchForm = ({ handleSubmit }: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inputValue, setInputValue] = useState("");
  const { tags: popularTags } = usePopularTags();
  const navigate = useNavigate();

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 3) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.form?.requestSubmit();
        }
      }, 500);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [debouncedValue]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const query = inputRef.current.value.trim();
      handleSubmit(e, query);
    }
  };

  const handleTagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="max-w-xl mx-auto w-full space-y-5">
      <form ref={formRef} onSubmit={onSubmit} className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar por título ou tag..."
          aria-label="Buscar posts"
          className="flex h-12 w-full rounded-xl border border-input bg-background pl-12 pr-4 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onChange={onChange}
          value={inputValue}
        />
      </form>

      {popularTags.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground text-center font-medium">Tags populares</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchForm };
