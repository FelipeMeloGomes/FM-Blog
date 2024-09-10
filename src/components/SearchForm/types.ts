import { FormEvent } from "react";

export interface SearchFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setQuery: (query: string) => void;
}
