import React from "react";
import {
  Button,
  ButtonProps as ChakraButtonProps,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

interface DeleteButtonProps extends ChakraButtonProps {
  alt?: string;
  onConfirm: () => void;
}

const DeleteButton = ({
  alt,
  children,
  onConfirm,
  ...rest
}: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Button
        {...rest}
        colorScheme="red"
        variant="solid"
        borderRadius="md"
        size="md"
        fontWeight="bold"
        _hover={{
          bg: "red.600",
          color: "white",
        }}
        _active={{
          bg: "red.700",
          color: "white",
        }}
        aria-label={alt}
        onClick={onOpen}
      >
        {children}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Exclusão
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja excluir?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export { DeleteButton };
