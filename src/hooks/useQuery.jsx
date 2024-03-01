// Hooks React
import { useMemo } from "react";

// React Router Dom
import { useLocation } from "react-router-dom";

export const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
};
