// Hooks
import { useState, useCallback } from "react";

const useCitySearch = (fetchData) => {
    const [city, setCity] = useState("");
    const [showDetails, setShowDetails] = useState(false);

    const search = useCallback(async () => {
        if (city === "") {
            return;
        }

        const normalizedCity = city
            .replace(/[^\w\s]|(\s)+(?=\s)/gi, "")
            .toLowerCase();

        await fetchData(normalizedCity);
        setShowDetails(true);
        setCity("");
    }, [city, fetchData]);

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
