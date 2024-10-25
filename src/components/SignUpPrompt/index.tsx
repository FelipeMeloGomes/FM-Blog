import { Box, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SignUpPromptProps } from "./types";

const SignUpPrompt = ({ message, linkText, linkUrl }: SignUpPromptProps) => (
  <Box>
    <Text textAlign="center" color="black" fontSize="sm" my={1}>
      {message}{" "}
      <Link as={RouterLink} to={linkUrl} color="black" fontWeight="medium">
        {linkText}
      </Link>
    </Text>
  </Box>
);

export { SignUpPrompt };
