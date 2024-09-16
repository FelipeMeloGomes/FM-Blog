import { useNavigate, NavigateFunction } from "react-router-dom";
import { useState, FormEvent } from "react";
import { SearchPostHook } from "./types";

export const useSearchPost = (): SearchPostHook => {
  const navigate: NavigateFunction = useNavigate();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return {
    handleSubmit,
    query,
    setQuery,
  };
};
