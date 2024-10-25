import { FormEvent, useEffect, useState } from "react";

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

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSearchPostTitle = (posts: Post[]): UseSearchPostTitle => {
  const [query, setQuery] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const debouncedQuery = useDebounce(query, 300); // 300ms debounce delay

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim().toLowerCase();

    setFilteredPosts(
      trimmedQuery === ""
        ? posts
        : posts.filter((post) =>
            post.title.toLowerCase().includes(trimmedQuery),
          ),
    );
  }, [debouncedQuery, posts]);

  return { handleSubmit, setQuery, filteredPosts };
};
