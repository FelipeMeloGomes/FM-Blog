import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const POSTS_PER_PAGE = 6;

export const fetchPosts = async (limitCount = POSTS_PER_PAGE) => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchPost = async (id: string) => {
  const docRef = doc(db, "posts", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error("Post not found");
  }
  return { id: snapshot.id, ...snapshot.data() };
};

export const fetchPostsByTag = async (tag: string, limitCount = POSTS_PER_PAGE) => {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    where("tagsArray", "array-contains", tag.toLowerCase()),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchUserPosts = async (uid: string, limitCount = POSTS_PER_PAGE) => {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
