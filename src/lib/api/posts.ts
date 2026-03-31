import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import type { Post } from "../../utils/ShareContent/types";
import { CONSTANTS } from "../../utils/constants";

const POSTS_PER_PAGE: number = CONSTANTS.PAGINATION.POSTS_PER_PAGE;

type PostWithId = Post & { id: string };

export const fetchPosts = async (limitCount = POSTS_PER_PAGE): Promise<PostWithId[]> => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PostWithId);
};

export const fetchPost = async (id: string): Promise<PostWithId> => {
  const docRef = doc(db, "posts", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error("Post not found");
  }
  return { id: snapshot.id, ...snapshot.data() } as PostWithId;
};

export const fetchPostsByTag = async (
  tag: string,
  limitCount = POSTS_PER_PAGE
): Promise<PostWithId[]> => {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    where("tagsArray", "array-contains", tag.toLowerCase()),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PostWithId);
};

export const fetchUserPosts = async (
  uid: string,
  limitCount = POSTS_PER_PAGE
): Promise<PostWithId[]> => {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PostWithId);
};
