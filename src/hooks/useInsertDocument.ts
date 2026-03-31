import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import type { FormData, InsertAction, OperationState } from "./types";

const initialState: OperationState = {
  loading: null,
  error: null,
};

const insertReducer = (state: OperationState, action: InsertAction): OperationState => {
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

/**
 * Hook para inserir um novo documento na coleção do Firestore.
 * Gerencia estados de loading/error com reducer pattern.
 *
 * @param docCollection - Nome da coleção
 * @returns Função insertDocument e estado da operação
 *
 * @example
 * ```tsx
 * const { insertDocument, response } = useInsertDocument("posts");
 *
 * await insertDocument({
 *   title: "Novo Post",
 *   image: "url",
 *   body: "conteúdo",
 *   tagsArray: ["react"],
 *   uid: user.uid,
 *   createdBy: user.name,
 *   likeCount: 0,
 *   likes: [],
 * });
 * ```
 */
export const useInsertDocument = (docCollection: string) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState<boolean>(false);

  const checkCancelBeforeDispatch = (action: InsertAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document: FormData) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      await addDoc(collection(db, docCollection), newDocument);

      checkCancelBeforeDispatch({ type: "INSERTED_DOC" });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro ao inserir o documento.";

      checkCancelBeforeDispatch({ type: "ERROR", payload: errorMessage });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
