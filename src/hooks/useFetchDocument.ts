import { type DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import type { DocumentData, FetchDocumentResult } from "./types";

/**
 * Hook para buscar um único documento do Firestore pelo ID.
 * Gerencia loading e error states.
 *
 * @param docCollection - Nome da coleção
 * @param id - ID do documento
 * @returns Documento, loading e error state
 *
 * @example
 * ```tsx
 * const { document, loading, error } = useFetchDocument("posts", postId);
 *
 * if (loading) return <Skeleton />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!document) return <NotFound />;
 * return <Post post={document} />;
 * ```
 */
export const useFetchDocument = (docCollection: string, id: string): FetchDocumentResult => {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() });
          setError(null);
        } else {
          setError("Document not found");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro ao buscar o documento.";

        setError(errorMessage);
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
