import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { DeleteAction, DeleteState } from "./types";

const initialState: DeleteState = {
  loading: null,
  error: null,
};

const deleteReducer = (
  state: DeleteState,
  action: DeleteAction,
): DeleteState => {
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
      toast.success("Documento deletado com sucesso!");
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
