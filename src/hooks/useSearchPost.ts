import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const useSearchPost = () => {
  const navigate: NavigateFunction = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
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
  }, [query, navigate]);

  return {
    handleSubmit,
    query,
    setQuery,
  };
};
