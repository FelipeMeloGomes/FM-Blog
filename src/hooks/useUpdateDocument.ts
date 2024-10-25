import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { OperationState, UpdateAction } from "./types";

const initialState: OperationState = {
  loading: null,
  error: null,
};

const updateReducer = (
  state: OperationState,
  action: UpdateAction,
): OperationState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection: string) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const [cancelled, setCancelled] = useState<boolean>(false);

  const checkCancelBeforeDispatch = (action: UpdateAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid: string, data: any) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, docCollection, uid);
      await updateDoc(docRef, data);
      checkCancelBeforeDispatch({ type: "UPDATED_DOC" });
    } catch (error: any) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { updateDocument, response };
};
