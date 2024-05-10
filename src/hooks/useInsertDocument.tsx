import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface InsertState {
    loading: boolean | null;
    error: string | null;
}

type InsertAction =
    | { type: "LOADING" }
    | { type: "INSERTED_DOC" }
    | { type: "ERROR"; payload: string };

const initialState: InsertState = {
    loading: null,
    error: null,
};

const insertReducer = (
    state: InsertState,
    action: InsertAction
): InsertState => {
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
