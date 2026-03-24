import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import type { SearchFormProps } from "./types";

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
    [handleSubmit, setQuery]
  );

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  }, []);

  return (
    <Box maxW="500px" mx="auto" w="full">
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="text.tertiary" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Buscar por tags..."
            aria-label="Buscar por tags"
            onKeyDown={handleInputKeyDown}
            bg="bg.primary"
            borderColor="border.default"
            color="text.primary"
            _focus={{ borderColor: "text.primary", boxShadow: "none" }}
            _placeholder={{ color: "text.tertiary" }}
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export { SearchForm };
