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
    <div className="max-w-[600px] mx-auto w-full space-y-4">
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por título ou tag..."
            aria-label="Buscar posts"
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 pl-12 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onChange={onChange}
            value={inputValue}
          />
        </div>
      </form>

      {popularTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground text-center">Tags populares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
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
