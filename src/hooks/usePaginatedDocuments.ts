import {
  type DocumentData as FirestoreDocumentData,
  type Query,
  type QueryDocumentSnapshot,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import type { DocumentData } from "./types";

export const POSTS_PER_PAGE = 6;

interface UsePaginatedDocumentsResult {
  posts: DocumentData[] | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  goToPage: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isLoadingPage: boolean;
}

export const usePaginatedDocuments = (
  docCollection: string,
  search: string | null = null,
  uid: string | null = null,
  pageSize: number = POSTS_PER_PAGE
): UsePaginatedDocumentsResult => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);

  const cursorsRef = useRef<(QueryDocumentSnapshot | null)[]>([null]);

  const countTotalPosts = useCallback(async (): Promise<number> => {
    try {
      const collectionRef = collection(db, docCollection);
      let q: Query<FirestoreDocumentData>;

      if (search) {
        const searchWithoutSpaces = search.replace(/\s+/g, "").toLowerCase();
        q = query(collectionRef, where("tagsArray", "array-contains", searchWithoutSpaces));
      } else if (uid) {
        q = query(collectionRef, where("uid", "==", uid));
      } else {
        q = query(collectionRef);
      }

      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch {
      return 0;
    }
  }, [docCollection, search, uid]);

  const fetchPage = useCallback(
    async (page: number): Promise<DocumentData[]> => {
      const collectionRef = collection(db, docCollection);
      let baseQuery: Query<FirestoreDocumentData>;

      if (search) {
        const searchWithoutSpaces = search.replace(/\s+/g, "").toLowerCase();
        baseQuery = query(
          collectionRef,
          where("tagsArray", "array-contains", searchWithoutSpaces),
          orderBy("createdAt", "desc")
        );
      } else if (uid) {
        baseQuery = query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
      } else {
        baseQuery = query(collectionRef, orderBy("createdAt", "desc"));
      }

      if (page === 1) {
        const firstPageQuery = query(baseQuery, limit(pageSize));
        const snapshot = await getDocs(firstPageQuery);
        if (snapshot.docs.length > 0) {
          cursorsRef.current = [null, snapshot.docs[snapshot.docs.length - 1]];
        }
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }

      const cursor = cursorsRef.current[page - 1];
      if (!cursor) {
        const firstPageQuery = query(baseQuery, limit(pageSize));
        const snapshot = await getDocs(firstPageQuery);
        cursorsRef.current = [null, snapshot.docs[snapshot.docs.length - 1]];
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }

      const pageQuery = query(baseQuery, startAfter(cursor), limit(pageSize));
      const snapshot = await getDocs(pageQuery);

      if (snapshot.docs.length > 0) {
        cursorsRef.current[page] = snapshot.docs[snapshot.docs.length - 1];
      }

      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    [docCollection, search, uid, pageSize]
  );

  useEffect(() => {
    const initialize = async () => {
      if (cancelled) return;

      setLoading(true);
      setError(null);

      try {
        const total = await countTotalPosts();
        setTotalPosts(total);
        const totalPgs = Math.max(1, Math.ceil(total / pageSize));
        setTotalPages(totalPgs);

        if (currentPage > totalPgs) {
          setCurrentPage(1);
        }

        const docs = await fetchPage(1);
        setPosts(docs);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro ao buscar documentos.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [docCollection, search, uid, pageSize, countTotalPosts, fetchPage, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  const goToPage = useCallback(
    async (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage || isLoadingPage) {
        return;
      }

      setIsLoadingPage(true);
      setError(null);

      try {
        const docs = await fetchPage(page);
        setPosts(docs);
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro ao carregar a página.";
        setError(errorMessage);
      } finally {
        setIsLoadingPage(false);
      }
    },
    [currentPage, totalPages, isLoadingPage, fetchPage]
  );

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    totalPosts,
    goToPage,
    hasNextPage,
    hasPrevPage,
    isLoadingPage,
  };
};
