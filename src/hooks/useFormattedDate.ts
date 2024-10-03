import { Timestamp } from "firebase/firestore";
import { useMemo } from "react";

export const useFormattedDate = (timestamp: Timestamp | null | undefined) => {
  const formattedDate = useMemo(() => {
    if (timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "";
  }, [timestamp]);

  return formattedDate;
};
