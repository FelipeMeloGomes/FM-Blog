import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import type { DocumentData } from "../../hooks/types";

export const fetchPosts = async (limitCount = 6): Promise<DocumentData[]> => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};

export const fetchPost = async (id: string): Promise<DocumentData | null> => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const fetchPostsByTag = async (tag: string, limitCount = 6): Promise<DocumentData[]> => {
  const tagWithoutSpaces = tag.replace(/\s+/g, "").toLowerCase();
  const q = query(
    collection(db, "posts"),
    where("tagsArray", "array-contains", tagWithoutSpaces),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};

export const fetchUserPosts = async (uid: string, limitCount = 6): Promise<DocumentData[]> => {
  const q = query(
    collection(db, "posts"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};

export const fetchMorePosts = async (
  lastDoc: DocumentData | null,
  limitCount = 6
): Promise<DocumentData[]> => {
  if (!lastDoc) return [];

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};
