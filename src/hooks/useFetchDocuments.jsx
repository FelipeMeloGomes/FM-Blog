import { useState, useEffect, useMemo } from "react";
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

    const loadData = useMemo(
        () => async () => {
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

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setLoading(false);
                });

                return unsubscribe;
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        },
        [docCollection, search, uid, cancelled]
    );

    useEffect(() => {
        let unsubscribe = null;

        if (!cancelled) {
            unsubscribe = loadData();
        }

        return () => {
            setCancelled(true);
            if (unsubscribe && typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, [loadData, cancelled]);

    return { documents, loading, error };
};
