import { useDeleteDialog } from "../../hooks/useDeleteDialog";

interface DeleteButtonProps {
  alt?: string;
  onConfirm: () => void;
  children?: React.ReactNode;
}

const DeleteButton = ({ alt, children, onConfirm }: DeleteButtonProps) => {
  const { isOpen, onOpen, handleConfirm, onClose } = useDeleteDialog({ onConfirm });

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
        aria-label={alt}
      >
        {children || "Excluir"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4 border shadow-lg">
            <h3 className="text-lg font-bold mb-2">Confirmar Exclusão</h3>
            <p className="text-muted-foreground mb-4">Você tem certeza que deseja excluir?</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-input hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { DeleteButton };
