import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";

interface UseDeleteDialogProps {
  onConfirm: () => void;
}

const useDeleteDialog = ({ onConfirm }: UseDeleteDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return {
    isOpen,
    onOpen,
    onClose,
    cancelRef,
    handleConfirm,
  };
};

export { useDeleteDialog };
