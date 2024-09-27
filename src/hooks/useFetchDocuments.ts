import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  startAfter,
  getDocs,
  QuerySnapshot,
  DocumentData as FirestoreDocumentData,
} from "firebase/firestore";
import { DocumentData, FetchDocumentsResult } from "./types";

export const useFetchDocuments = (
  docCollection: string,
  search: string | null = null,
  uid: string | null = null,
  limitCount: number = 5,
): FetchDocumentsResult => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [cancelled, setCancelled] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;

      setLoading(true);
      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (search) {
          const searchWithoutSpaces = search.replace(/\s+/g, "").toLowerCase();
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", searchWithoutSpaces),
            orderBy("createdAt", "desc"),
            limit(limitCount),
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc"),
            limit(limitCount),
          );
        } else {
          q = query(
            collectionRef,
            orderBy("createdAt", "desc"),
            limit(limitCount),
          );
        }

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot: QuerySnapshot<FirestoreDocumentData>) => {
            setDocuments(
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
          },
        );

        return () => unsubscribe();
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [docCollection, search, uid, cancelled, limitCount]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  const loadMoreDocuments = async () => {
    if (!lastVisible) return;

    const collectionRef = collection(db, docCollection);
    const nextQuery = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(limitCount),
    );

    try {
      const snapshot = await getDocs(nextQuery);
      const newDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newDocs.length === 0) {
        setLastVisible(null);
        return;
      }

      setDocuments((prevDocs) =>
        prevDocs ? [...prevDocs, ...newDocs] : newDocs,
      );
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { documents, loading, error, loadMoreDocuments, lastVisible };
};
