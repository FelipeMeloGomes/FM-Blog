import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    QuerySnapshot,
    DocumentData as FirestoreDocumentData,
} from "firebase/firestore";

interface DocumentData {
    id?: string;
    title?: string;
    content?: string;
}

interface FetchDocumentsResult {
    documents: DocumentData[] | null;
    loading: boolean;
    error: string | null;
}

export const useFetchDocuments = (
    docCollection: string,
    search: string | null = null,
    uid: string | null = null
): FetchDocumentsResult => {
    const [documents, setDocuments] = useState<DocumentData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [cancelled, setCancelled] = useState<boolean>(false);

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
                    const searchWithoutSpaces = search
                        .replace(/\s+/g, "")
                        .toLowerCase();
                    q = query(
                        collectionRef,
                        where(
                            "tagsArray",
                            "array-contains",
                            searchWithoutSpaces
                        ),
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

                const unsubscribe = onSnapshot(
                    q,
                    (querySnapshot: QuerySnapshot<FirestoreDocumentData>) => {
                        setDocuments(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }))
                        );
                    }
                );

                return () => unsubscribe();
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};
