import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { DeleteAction, OperationState } from "./types";
import { useToastNotification } from "./useToastNotification";

const initialState: OperationState = {
  loading: null,
  error: null,
};

const deleteReducer = (
  state: OperationState,
  action: DeleteAction,
): OperationState => {
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

export const useDeleteDocument = (docCollection: string) => {
  const [{ loading, error }, dispatch] = useReducer(
    deleteReducer,
    initialState,
  );

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
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      const errorMessage =
        "message" in error
          ? error.message
          : "Ocorreu um erro ao excluir o documento.";

      checkCancelBeforeDispatch({ type: "ERROR", payload: errorMessage });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { deleteDocument, loading, error };
};
