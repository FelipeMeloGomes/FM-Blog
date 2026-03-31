type CancelFlag = { cancelled: boolean };

/**
 * Utilitário para verificar se uma operação foi cancelada antes de dispatch.
 * Previne updates em componentes desmontados.
 *
 * @param cancelled - Flag de cancelamento
 * @param action - Função opcional para executar se não cancelado
 * @returns true se cancelado, false caso contrário
 *
 * @example
 * ```tsx
 * const cancelled = { cancelled: false };
 *
 * if (checkCancelBeforeDispatch(cancelled)) return;
 * dispatch({ type: "SUCCESS" });
 * ```
 */
export const checkCancelBeforeDispatch = (cancelled: CancelFlag, action?: () => void): boolean => {
  if (cancelled.cancelled) {
    return true;
  }
  action?.();
  return false;
};
