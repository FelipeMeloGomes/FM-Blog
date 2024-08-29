import { useNavigate, NavigateFunction } from "react-router-dom";
import { useState, SetStateAction, Dispatch, FormEvent } from "react";

interface Post {
  id: string;
  title: string;
  uid: string;
  body: string;
  createdAt: string;
  createdBy: string;
  image: string;
  tagsArray: string;
}

interface SearchPostHook {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  sortedPosts: Post[];
  setSortedPosts: Dispatch<SetStateAction<Post[]>>;
}

export const useSearchPost = (): SearchPostHook => {
  const navigate: NavigateFunction = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return {
    handleSubmit,
    query,
    setQuery,
    sortedPosts,
    setSortedPosts,
  };
};
