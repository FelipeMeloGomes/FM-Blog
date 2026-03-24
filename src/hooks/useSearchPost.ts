import { useEffect, useState } from "react";
import { type NavigateFunction, useNavigate } from "react-router-dom";

export const useSearchPost = () => {
  const navigate: NavigateFunction = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (query) {
        navigate(`/search?q=${query}`);
      }
    }, 300);

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, navigate]);

  return {
    handleSubmit,
    query,
    setQuery,
  };
};
