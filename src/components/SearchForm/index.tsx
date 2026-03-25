import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import type { SearchFormProps } from "./types";

const SearchForm = ({ handleSubmit }: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const query = inputRef.current.value.trim();
      handleSubmit(e, query);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto w-full">
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Título do post"
            aria-label="Buscar por título"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 pl-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </form>
    </div>
  );
};

export { SearchForm };
