import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useRef } from "react";

interface UseDeleteDialogProps {
  onConfirm: () => void;
}

const useDeleteDialog = ({ onConfirm }: UseDeleteDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

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
