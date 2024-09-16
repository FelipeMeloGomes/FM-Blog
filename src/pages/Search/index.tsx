import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import { PostDetail } from "../../components/PostDetail";
import { TextField } from "../../components/TextField";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <Box textAlign="center" mb={20} mx="auto" maxW="90%">
      <TextField
        title="Procurar"
        paragraph={`Resultados encontrados para: ${search}`}
      />

      {posts && posts.length > 0 && (
        <Flex justify="center" mb={8}>
          <Button
            as={Link}
            to="/"
            variant="outline"
            colorScheme="blue"
            leftIcon={<ArrowBackIcon />}
          >
            Voltar
          </Button>
        </Flex>
      )}

      <Flex flexWrap="wrap" gap={10} justify="center">
        {posts?.length === 0 ? (
          <Box textAlign="center" mb={8}>
            <Text mb={8}>
              Não foram encontrados posts a partir da sua busca...
            </Text>
            <Button as={Link} to="/" colorScheme="blue">
              Voltar
            </Button>
          </Box>
        ) : (
          posts?.map((post) => <PostDetail key={post.id} post={post} />)
        )}
      </Flex>
    </Box>
  );
};

export { Search };
