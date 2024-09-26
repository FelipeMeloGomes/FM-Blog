import { useState, useEffect, FormEvent } from "react";

interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

interface Post {
  body: string;
  createdAt: CreatedAt;
  createdBy: string;
  id: string;
  image: string;
  likeCount: number;
  likes: string[];
  photoURL: string;
  tagsArray: string[];
  title: string;
  uid: string;
}

interface UseSearchPostTitle {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredPosts: Post[];
}

export const useSearchPostTitle = (posts: Post[]): UseSearchPostTitle => {
  const [query, setQuery] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredPosts(results);
    }
  }, [query, posts]);

  return { handleSubmit, setQuery, filteredPosts };
};
