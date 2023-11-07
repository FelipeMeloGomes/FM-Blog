import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const deleteReducer = (state, action) => {
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

export const useDeleteDocument = (docCollection) => {
    const [{ loading, error }, dispatch] = useReducer(deleteReducer, {
        loading: null,
        error: null,
    });

    const isCancelled = useState(false)[0];

    const checkCancelBeforeDispatch = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id));
            checkCancelBeforeDispatch({ type: "DELETED_DOC" });
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => () => isCancelled, [isCancelled]);

    return { deleteDocument, loading, error };
};
