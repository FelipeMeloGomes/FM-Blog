import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { InsertAction, OperationState } from "./types";

const initialState: OperationState = {
  loading: null,
  error: null,
};

const insertReducer = (
  state: OperationState,
  action: InsertAction,
): OperationState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection: string) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState<boolean>(false);

  const checkCancelBeforeDispatch = (action: InsertAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document: any) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      await addDoc(collection(db, docCollection), newDocument);

      checkCancelBeforeDispatch({ type: "INSERTED_DOC" });
    } catch (error: any) {
      const errorMessage =
        "message" in error
          ? error.message
          : "Ocorreu um erro ao inserir o documento.";

      checkCancelBeforeDispatch({ type: "ERROR", payload: errorMessage });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
