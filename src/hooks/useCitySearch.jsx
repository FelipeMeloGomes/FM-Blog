// Hooks
import { useState, useCallback } from "react";

const normalizeCity = (city) => {
    return city.replace(/[^\w\s]|(\s)+(?=\s)/gi, "").toLowerCase();
};

const createSearchStrategy = (fetchData) => {
    return async (city) => {
        const normalizedCity = normalizeCity(city);
        if (normalizedCity === "") {
            return;
        }
        await fetchData(normalizedCity);
    };
};

const useCitySearch = (fetchData) => {
    const [city, setCity] = useState("");
    const [showDetails, setShowDetails] = useState(false);

    const searchStrategy = createSearchStrategy(fetchData);

    const search = useCallback(async () => {
        if (city === "") {
            return;
        }

        await searchStrategy(city);
        setShowDetails(true);
        setCity("");
    }, [city, searchStrategy]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                search();
            }
        },
        [search]
    );

    return {
        city,
        setCity,
        showDetails,
        setShowDetails,
        handleKeyDown,
        search,
    };
};

export default useCitySearch;
