import { Box, Heading } from "@chakra-ui/react";
import { PostTitleProps } from "./types";

const PostTitle = ({ title }: PostTitleProps) => (
  <Box mt={7} textAlign="center">
    <Heading as="h2" size="lg">
      <Box as="span" bg="gray.200" fontWeight="extrabold" mr={2}>
        Editando Post:
      </Box>
      {title}
    </Heading>
  </Box>
);

export { PostTitle };
