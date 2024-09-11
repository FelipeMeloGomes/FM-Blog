import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DeleteButton } from "../DeleteButton";
import { PostItemProps } from "./types";

const PostItem = ({ post, handleDelete, createdBy, userId }: PostItemProps) => {
  const canDelete = userId === createdBy;

  return (
    <Box
      key={post.id}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      maxW="90%"
      p={2}
      borderBottomWidth="1px"
      borderColor="gray.200"
      mb={2}
      gap={8}
    >
      <Text
        color="black"
        fontSize={useBreakpointValue({ base: "md", md: "lg" })}
      >
        {post.title}
      </Text>
      <VStack align="flex-start" spacing={2}>
        <Button
          as={RouterLink}
          to={`/posts/${post.id}`}
          colorScheme="blue"
          borderRadius="md"
          size="md"
          fontWeight="medium"
        >
          Ver
        </Button>
        <Button
          as={RouterLink}
          to={`/posts/edit/${post.id}`}
          colorScheme="teal"
          variant="outline"
          borderRadius="md"
          size="md"
          fontWeight="medium"
        >
          Editar
        </Button>
        {canDelete && (
          <DeleteButton onConfirm={() => handleDelete(post.id)} alt="Excluir">
            Excluir
          </DeleteButton>
        )}
      </VStack>
    </Box>
  );
};

export { PostItem };
