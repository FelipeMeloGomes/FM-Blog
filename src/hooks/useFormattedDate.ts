import { Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";

export const useFormattedDate = (timestamp: Timestamp | null) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (timestamp) {
      const date = timestamp.toDate();
      const formatted = date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setFormattedDate(formatted);
    }
  }, [timestamp]);

  return formattedDate;
};
