import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { SearchFormProps } from "./types";

const SearchForm = ({ handleSubmit, setQuery }: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputRef.current) {
        const query = inputRef.current.value.trim().toLowerCase();
        setQuery(query);
      }
      handleSubmit(e);
    },
    [handleSubmit, setQuery],
  );

  const handleIconClick = useCallback(() => {
    formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
  }, []);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
      }
    },
    [],
  );

  return (
    <Box display="flex" alignItems="center" p={4}>
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <InputGroup width="100%" maxWidth="600px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ou busque por tags..."
            aria-label="Buscar por tags"
            autoFocus
            onKeyDown={handleInputKeyDown}
          />
        </InputGroup>

        <Button
          type="button"
          colorScheme="blue"
          ml={2}
          onClick={handleIconClick}
          aria-label="Pesquisar"
        >
          <SearchIcon />
        </Button>
      </form>
    </Box>
  );
};

export { SearchForm };
