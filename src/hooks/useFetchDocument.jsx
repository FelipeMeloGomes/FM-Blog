// Hooks React
import { useState, useEffect } from "react";

// Firebase
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadDocument = async () => {
            setLoading(true);

            try {
                const docRef = doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDocument(docSnap.data());
                    setError(null);
                } else {
                    setError("Document not found");
                }
            } catch (error) {
                setError(error.message);
            }

            if (isMounted) setLoading(false);
        };

        loadDocument();

        return () => {
            isMounted = false;
        };
    }, [docCollection, id]);

    return { document, loading, error };
};
