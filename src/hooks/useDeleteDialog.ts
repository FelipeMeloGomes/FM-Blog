import { useCallback, useRef, useState } from "react";

interface UseDeleteDialogProps {
  onConfirm: () => void;
}

/**
 * Hook para gerenciar estado de diálogo de confirmação de exclusão.
 * Fornece callbacks para abrir/fechar e referência para focus trap.
 *
 * @param onConfirm - Função chamada ao confirmar exclusão
 * @returns Estado e callbacks do diálogo
 *
 * @example
 * ```tsx
 * const { isOpen, onOpen, onClose, cancelRef, handleConfirm } = useDeleteDialog({
 *   onConfirm: () => deletePost(postId),
 * });
 *
 * <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
 *   <AlertDialogCancel ref={cancelRef}>Cancelar</AlertDialogCancel>
 *   <AlertDialogAction onClick={handleConfirm}>Excluir</AlertDialogAction>
 * </AlertDialog>
 * ```
 */
const useDeleteDialog = ({ onConfirm }: UseDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    cancelRef,
    handleConfirm,
  };
};

export { useDeleteDialog };
