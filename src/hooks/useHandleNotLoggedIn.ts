import { useCallback } from "react";
import { useToastNotification } from "./useToastNotification";

/**
 * Hook para mostrar toast quando usuário não autenticado tenta realizar ação.
 * Redireciona para login/registro.
 *
 * @returns Função para mostrar toast de não autenticado
 *
 * @example
 * ```tsx
 * const handleNotLoggedIn = useHandleNotLoggedIn();
 *
 * // Em um clique
 * if (!user) {
 *   handleNotLoggedIn();
 *   return;
 * }
 * ```
 */
export const useHandleNotLoggedIn = () => {
  const { showToast } = useToastNotification();

  const handleNotLoggedIn = useCallback(() => {
    showToast({
      title: "Info",
      description: "Faça login ou registre-se para curtir este post.",
      status: "error",
    });
  }, [showToast]);

  return handleNotLoggedIn;
};
