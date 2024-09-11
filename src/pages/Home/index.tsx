import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSearchPost } from "../../hooks/useSearchPost";
import { useEffect } from "react";
import { TextField } from "../../components/TextField";
import { SearchForm } from "../../components/SearchForm";
import { PostList } from "../../components/PostList";
import { NoPosts } from "../../components/NoPosts";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");
  const { handleSubmit, setQuery } = useSearchPost();

  useEffect(() => {
    if (posts) {
    }
  }, [posts]);

  if (loading) {
    return;
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
    </Flex>
  );
};

export { Home };
