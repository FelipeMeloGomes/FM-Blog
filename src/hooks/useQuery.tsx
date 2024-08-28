import { useMemo } from "react";
import { useLocation, Location } from "react-router-dom";

export const useQuery = (): URLSearchParams => {
  const location: Location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  return searchParams;
};
