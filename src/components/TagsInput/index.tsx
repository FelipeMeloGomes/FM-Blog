import { Box, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { TagsInputProps } from "./types";

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  ({ placeholder }, ref) => (
    <Box mt={7} display="flex" flexDirection="column">
      <FormLabel fontWeight="bold" fontSize="sm">
        Tags:
      </FormLabel>
      <Input
        type="text"
        name="tags"
        placeholder={placeholder}
        ref={ref}
        borderColor="gray.300"
        borderRadius="md"
        px={3}
        py={3}
        _focus={{ borderColor: "black" }}
        transition="all 0.2s ease-in-out"
      />
    </Box>
  ),
);

export { TagsInput };
