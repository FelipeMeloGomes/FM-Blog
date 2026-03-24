import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { PostDetail } from "../../components/PostDetail";
import { TextField } from "../../components/TextField";
import { usePaginatedDocuments } from "../../hooks/usePaginatedDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const [searchParams, setSearchParams] = useSearchParams();

  const { posts, loading, currentPage, totalPages, goToPage, isLoadingPage } =
    usePaginatedDocuments("posts", search, null, 6);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }
    setSearchParams(newParams);
    goToPage(page);
  };

  if (loading) {
    return (
      <Box textAlign="center" mb={20} mx="auto" maxW="90%">
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mb={20} mx="auto" maxW="90%">
      <TextField title="Procurar" paragraph={`Resultados encontrados para: ${search}`} />

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
            <Text mb={8}>Não foram encontrados posts a partir da sua busca...</Text>
            <Button as={Link} to="/" colorScheme="blue">
              Voltar
            </Button>
          </Box>
        ) : (
          <>
            {(
              posts as Array<{
                id: string;
                title: string;
                image: string;
                createdBy: string;
                tagsArray: string[];
                createdAt?: unknown;
              }>
            )?.map((post) => (
              <PostDetail
                key={post.id}
                post={post as import("../../components/PostDetail/types").Post}
              />
            ))}
            <Box w="full">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoadingPage}
              />
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Search;
