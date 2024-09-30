import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  likes?: string[];
  likeCount?: number;
  createdBy: string;
  uid?: string;
  title: string;
  body?: string;
  image: string;
  description?: string;
  createdAt?: Timestamp | null | undefined;
  tagsArray: string[];
}

export interface ShareData {
  title: string;
  text: string | undefined;
  url: string;
}
