// Hooks
import { useState, useCallback } from "react";

const normalizeCity = (city) => {
    const cityWithoutAccents = city
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const normalizedCity = cityWithoutAccents
        .replace(/[\W_]+/g, " ")
        .trim()
        .replace(/\s+/g, "");
    return normalizedCity;
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

export const useCitySearch = (fetchData) => {
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
