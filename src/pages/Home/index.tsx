import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState";
import { Pagination } from "../../components/Pagination";
import { PostCard } from "../../components/PostCard";
import { PostListSkeleton } from "../../components/PostListSkeleton";
import { SearchForm } from "../../components/SearchForm";
import { usePaginatedDocuments } from "../../hooks/usePaginatedDocuments";
import { useSearchPost } from "../../hooks/useSearchPost";

const Home = () => {
  const navigate = useNavigate();
  const [_searchParams, setSearchParams] = useSearchParams();

  const { posts, loading, currentPage, totalPages, goToPage, isLoadingPage } =
    usePaginatedDocuments("posts", null, null, 6);

  const { handleSubmit, setQuery } = useSearchPost();

  const postsArray = (posts || []) as Array<{
    id: string;
    title: string;
    image: string;
    createdBy: string;
    tagsArray: string[];
    body?: string;
    description?: string;
    createdAt?: unknown;
    likes?: string[];
  }>;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: String(page) });
    }
    goToPage(page);
  };

  if (loading) {
    return (
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading size="lg" fontFamily="heading" color="text.primary">
            Os últimos posts
          </Heading>
          <Text color="text.secondary" fontSize="md">
            Textos sobre desenvolvimento, design e tecnologia.
          </Text>
        </VStack>
        <PostListSkeleton />
      </VStack>
    );
  }

  return (
    <VStack spacing={12} align="stretch">
      <VStack spacing={4} textAlign="center">
        <Heading size="lg" fontFamily="heading" color="text.primary">
          Os últimos posts
        </Heading>
        <Text color="text.secondary" fontSize="md">
          Textos sobre desenvolvimento, design e tecnologia.
        </Text>
      </VStack>

      <SearchForm handleSubmit={handleSubmit} setQuery={setQuery} />

      {postsArray.length === 0 ? (
        <EmptyState
          icon={<FiFileText />}
          title="Nenhum post ainda"
          description="Seja o primeiro a publicar algo incrível aqui."
          action={{ label: "Criar primeiro post", onClick: () => navigate("/posts/create") }}
        />
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {postsArray.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
          <Box pt={8}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoadingPage}
            />
          </Box>
        </>
      )}
    </VStack>
  );
};

export default Home;
