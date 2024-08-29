import { useState, useCallback, Dispatch, SetStateAction } from "react";

type FetchDataFunction = (city: string) => Promise<void>;

const normalizeCity = (city: string): string => {
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

const createSearchStrategy = (fetchData: FetchDataFunction) => {
  return async (city: string) => {
    const normalizedCity = normalizeCity(city);
    if (normalizedCity === "") {
      return;
    }
    await fetchData(normalizedCity);
  };
};

interface CitySearchHook {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  showDetails: boolean;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  search: () => Promise<void>;
}

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
