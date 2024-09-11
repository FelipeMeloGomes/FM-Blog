import { useState } from "react";
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchFormProps } from "./types";

const SearchForm = ({ handleSubmit, setQuery }: SearchFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInput = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box display="flex" alignItems="center" p={4}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        {isOpen ? (
          <InputGroup width="100%" maxWidth="600px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Ou busque por tags..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              aria-label="Buscar por tags"
              autoFocus
            />
          </InputGroup>
        ) : null}

        <Button
          type="button"
          colorScheme="blue"
          ml={2}
          onClick={toggleInput}
          aria-label={isOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
        >
          <SearchIcon />
        </Button>
      </form>
    </Box>
  );
};

export { SearchForm };
