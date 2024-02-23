import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (cancelled) {
                return;
            }

            setLoading(true);

            const collectionRef = collection(db, docCollection);

            try {
                let q;

                if (search) {
                    q = query(
                        collectionRef,
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                } else if (uid) {
                    q = query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    );
                } else {
                    q = query(collectionRef, orderBy("createdAt", "desc"));
                }

                const snapshot = await onSnapshot(q, (querySnapshot) => {
                    const newDocuments = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setDocuments(newDocuments);
                    setLoading(false);
                });

                if (typeof snapshot === "function") {
                    return () => {
                        setCancelled(true);
                        snapshot();
                    };
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        const unsubscribe = loadData();

        return () => {
            setCancelled(true);

            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, [docCollection, search, uid, cancelled]);

    return { documents, loading, error };
};
