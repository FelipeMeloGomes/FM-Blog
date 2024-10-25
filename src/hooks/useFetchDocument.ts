import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { DocumentData, FetchDocumentResult } from "./types";

export const useFetchDocument = (
  docCollection: string,
  id: string,
): FetchDocumentResult => {
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
      } catch (error: any) {
        const errorMessage =
          "message" in error
            ? error.message
            : "Ocorreu um erro ao buscar o documento.";

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
