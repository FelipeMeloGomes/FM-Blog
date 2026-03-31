import type { FormEvent } from "react";
import { type NavigateFunction, useNavigate } from "react-router-dom";

/**
 * Hook para gerenciar navegação de busca de posts.
 * Redireciona para página de resultados com query param.
 *
 * @returns Função handleSubmit para formulário de busca
 *
 * @example
 * ```tsx
 * const { handleSubmit } = useSearchPost();
 *
 * <form onSubmit={(e) => handleSubmit(e, query)}>
 *   <input value={query} onChange={(e) => setQuery(e.target.value)} />
 * </form>
 * ```
 */
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
