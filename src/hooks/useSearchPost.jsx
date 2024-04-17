// React router dom
import { useNavigate } from "react-router-dom";

// Hooks
import { useState } from "react";

export const useSearchPost = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [sortedPosts, setSortedPosts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
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
