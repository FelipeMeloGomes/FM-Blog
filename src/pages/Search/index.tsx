import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { PostCard } from "../../components/PostCard";
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
      <VStack spacing={8}>
        <VStack spacing={2} textAlign="center">
          <Heading size="lg" fontFamily="heading" color="text.primary">
            Resultados
          </Heading>
          <Text color="text.secondary" fontSize="md">
            Buscando posts para: "{search}"
          </Text>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack spacing={12} align="stretch">
      <VStack spacing={4} textAlign="center">
        <Heading size="lg" fontFamily="heading" color="text.primary">
          Resultados
        </Heading>
        <Text color="text.secondary" fontSize="md">
          {posts && posts.length > 0
            ? `${posts.length} post${posts.length > 1 ? "s" : ""} encontrado${posts.length > 1 ? "s" : ""} para: "${search}"`
            : `Buscando posts para: "${search}"`}
        </Text>
      </VStack>

      {posts && posts.length > 0 && (
        <Button
          as={Link}
          to="/"
          variant="ghost"
          leftIcon={<ArrowBackIcon />}
          size="sm"
          alignSelf="flex-start"
        >
          Voltar
        </Button>
      )}

      {posts?.length === 0 ? (
        <VStack spacing={6} py={16}>
          <Text fontSize="lg" color="text.secondary">
            Nenhum post encontrado para "{search}"
          </Text>
          <Button as={Link} to="/" variant="outline" size="sm">
            Voltar para home
          </Button>
        </VStack>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {(
              posts as Array<{
                id: string;
                title: string;
                image: string;
                body?: string;
                createdBy: string;
                tagsArray: string[];
                createdAt?: unknown;
                description?: string;
                likes?: string[];
              }>
            )?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>

          {totalPages > 1 && (
            <Box pt={8}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoadingPage}
              />
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

export default Search;
