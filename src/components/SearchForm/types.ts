import type { FormEvent } from "react";

export interface SearchFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>, query: string) => void;
}
