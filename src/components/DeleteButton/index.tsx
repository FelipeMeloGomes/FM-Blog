import { FiAlertTriangle } from "react-icons/fi";
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
        className="inline-flex items-center justify-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-2 px-4 rounded-xl transition-all active:scale-95"
        aria-label={alt}
      >
        {children || "Excluir"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card p-8 rounded-2xl max-w-md w-full border shadow-2xl animate-zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <FiAlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-xl font-bold font-heading">Confirmar Exclusão</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Você tem certeza que deseja excluir? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-input hover:bg-muted transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-colors font-medium"
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
