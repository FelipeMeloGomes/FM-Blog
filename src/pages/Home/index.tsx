import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSearchPost } from "../../hooks/useSearchPost";
import { useEffect, useState } from "react";
import { TextField } from "../../components/TextField";
import { SearchForm } from "../../components/SearchForm";
import { PostList } from "../../components/PostList";
import { NoPosts } from "../../components/NoPosts";
import { Spinner } from "../../components/Spinner";
import { Button } from "../../components/Button";
import { Box, Flex } from "@chakra-ui/react";

const Home = () => {
  const {
    documents: posts,
    loading,
    loadMoreDocuments,
    lastVisible,
  } = useFetchDocuments("posts", null, null, 6);
  const { handleSubmit, setQuery } = useSearchPost();
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setLoadingMore(true);
    loadMoreDocuments();
    setLoadingMore(false);
  };

  useEffect(() => {
    if (posts) {
    }
  }, [posts]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      width="100%"
      p={4}
    >
      <TextField title="Veja os nossos posts mais recentes" />
      <SearchForm handleSubmit={handleSubmit} setQuery={setQuery} />
      {posts?.length === 0 ? <NoPosts /> : <PostList posts={posts} />}
      <Box>
        <Button onClick={handleLoadMore} disabled={loadingMore || !lastVisible}>
          {loadingMore ? <Spinner /> : "Carregar mais posts"}
        </Button>
      </Box>
    </Flex>
  );
};

export { Home };
