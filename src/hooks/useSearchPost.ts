import type { FormEvent } from "react";
import { type NavigateFunction, useNavigate } from "react-router-dom";

export const useSearchPost = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>, query: string): void => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return {
    handleSubmit,
  };
};
