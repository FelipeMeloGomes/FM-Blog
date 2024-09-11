import { Box, Text } from "@chakra-ui/react";
import { TextFieldProps } from "./types";

const TextField = ({ title = "", paragraph = "" }: TextFieldProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box as="h1" fontSize="xl">
        {title}
      </Box>
      <Text color="gray.400">{paragraph}</Text>
    </Box>
  );
};

export { TextField };
