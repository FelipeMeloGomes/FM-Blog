import type { Timestamp } from "firebase/firestore";
import { useMemo } from "react";

/**
 * Hook para formatar timestamps do Firebase para data legível em pt-BR.
 * Usa useMemo para evitar recálculos desnecessários.
 *
 * @param timestamp - Timestamp do Firebase (pode ser null/undefined)
 * @returns String formatada (ex: "25 de março de 2024") ou string vazia
 *
 * @example
 * ```tsx
 * const formattedDate = useFormattedDate(post.createdAt);
 * // "25 de março de 2024"
 * ```
 */
export const useFormattedDate = (timestamp: Timestamp | null | undefined) => {
  const formattedDate = useMemo(() => {
    if (timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "";
  }, [timestamp]);

  return formattedDate;
};
