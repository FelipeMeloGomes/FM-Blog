import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import type { DeleteAction, OperationState } from "./types";
import { useToastNotification } from "./useToastNotification";

const initialState: OperationState = {
  loading: null,
  error: null,
};

const deleteReducer = (state: OperationState, action: DeleteAction): OperationState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

/**
 * Hook para deletar um documento do Firestore.
 * Mostra toast de sucesso/erro automaticamente.
 *
 * @param docCollection - Nome da coleção
 * @returns Função deleteDocument, loading e error state
 *
 * @example
 * ```tsx
 * const { deleteDocument, loading } = useDeleteDocument("posts");
 *
 * await deleteDocument(postId);
 * ```
 */
export const useDeleteDocument = (docCollection: string) => {
  const [{ loading, error }, dispatch] = useReducer(deleteReducer, initialState);

  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const { showToast } = useToastNotification();

  const checkCancelBeforeDispatch = (action: DeleteAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id: string) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      await deleteDoc(doc(db, docCollection, id));
      checkCancelBeforeDispatch({ type: "DELETED_DOC" });
      showToast({
        title: "Success",
        description: "Documento Deletado com Sucesso.",
        status: "success",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro ao excluir o documento.";

      checkCancelBeforeDispatch({ type: "ERROR", payload: errorMessage });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { deleteDocument, loading, error };
};
