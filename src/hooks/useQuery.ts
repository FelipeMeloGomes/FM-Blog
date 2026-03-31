import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook para acessar query params da URL atual.
 * Usa useMemo para evitar recriação desnecessária.
 *
 * @returns URLSearchParams com os parâmetros da query string
 *
 * @example
 * ```tsx
 * const queryParams = useQuery();
 * const search = queryParams.get("q");
 * const page = queryParams.get("page");
 * ```
 */
export const useQuery = (): URLSearchParams => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
