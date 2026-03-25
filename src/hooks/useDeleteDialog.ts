import { useCallback, useRef, useState } from "react";

interface UseDeleteDialogProps {
  onConfirm: () => void;
}

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
