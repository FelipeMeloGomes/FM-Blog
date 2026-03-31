import {
  type DocumentData as FirestoreDocumentData,
  type Query,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import type { DocumentData, FetchDocumentsResult } from "./types";

/**
 * Hook para buscar documentos do Firestore em tempo real (onSnapshot).
 * Suporta busca por tags, filtro por usuário e paginação.
 *
 * @param docCollection - Nome da coleção
 * @param search - Termo de busca por tags (opcional)
 * @param uid - Filtrar por ID do usuário (opcional)
 * @param limitCount - Limite de documentos (default: 5)
 * @returns Lista de documentos, loading, error e função loadMore
 *
 * @example
 * ```tsx
 * const { documents, loading, loadMoreDocuments } = useFetchDocuments(
 *   "posts",
 *   search,
 *   userId,
 *   10
 * );
 * ```
 */
export const useFetchDocuments = (
  docCollection: string,
  search: string | null = null,
  uid: string | null = null,
  limitCount = 5
): FetchDocumentsResult => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [cancelled, setCancelled] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;

      setLoading(true);
      const collectionRef = collection(db, docCollection);

      try {
        let q: Query<FirestoreDocumentData>;

        if (search) {
          const searchWithoutSpaces = search.replace(/\s+/g, "").toLowerCase();
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", searchWithoutSpaces),
            orderBy("createdAt", "desc"),
            limit(limitCount)
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc"),
            limit(limitCount)
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"), limit(limitCount));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<FirestoreDocumentData>) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          setLastVisible(
            (querySnapshot.docs[querySnapshot.docs.length - 1] as
              | QueryDocumentSnapshot
              | undefined) ?? null
          );
        });

        return () => unsubscribe();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro ao buscar documentos.";
        setError(errorMessage);
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
      limit(limitCount)
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

      setDocuments((prevDocs) => (prevDocs ? [...prevDocs, ...newDocs] : newDocs));
      setLastVisible(
        (snapshot.docs[snapshot.docs.length - 1] as QueryDocumentSnapshot | undefined) ?? null
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro ao carregar mais documentos.";
      setError(errorMessage);
    }
  };

  return {
    documents,
    loading,
    error,
    loadMoreDocuments,
    lastVisible: lastVisible as QueryDocumentSnapshot | null,
  };
};
