import { useState, useCallback } from "react";
import { CitySearchHook, FetchDataFunction } from "./types";

const normalizeCity = (city: string): string => {
  const cityWithoutAccents = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const normalizedCity = cityWithoutAccents
    .replace(/[\W_]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
  return normalizedCity;
};

const createSearchStrategy = (fetchData: FetchDataFunction) => {
  return async (city: string) => {
    const normalizedCity = normalizeCity(city);
    if (normalizedCity === "") {
      return;
    }
    await fetchData(normalizedCity);
  };
};

export const useCitySearch = (fetchData: FetchDataFunction): CitySearchHook => {
  const [city, setCity] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

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
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        search();
      }
    },
    [search],
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
