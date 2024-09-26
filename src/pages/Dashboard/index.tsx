import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { handleDeletePost } from "../../utils/HandleDelete";
import { PostItem } from "../../components/PostItem";
import { NoPosts } from "../../components/NoPosts";
import { Flex, Text } from "@chakra-ui/react";
import { SearchForm } from "../../components/SearchForm";
import { useSearchPostTitle } from "../../hooks/useSearchTitle";

const Dashboard = ({ createdBy }: { createdBy: string }) => {
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");
  const { handleSubmit, setQuery, filteredPosts } = useSearchPostTitle(posts);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex direction="column" align="center" w="full" minH="100vh" p={4}>
      <TextField title="Dashboard" paragraph="Gerencie os seus posts" />
      {filteredPosts?.length === 0 ? (
        <NoPosts />
      ) : (
        <>
          <SearchForm handleSubmit={handleSubmit} setQuery={setQuery} />
          <Flex
            justify="space-between"
            w="full"
            maxW="90%"
            p={4}
            borderBottomWidth="2px"
            borderColor="gray.300"
            fontWeight="bold"
          >
            <Text>Título</Text>
            <Text>Ações</Text>
          </Flex>

          {filteredPosts?.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              handleDelete={() =>
                handleDeletePost(
                  post.id,
                  createdBy,
                  user?.uid || "",
                  deleteDocument,
                )
              }
              createdBy={createdBy}
              userId={user?.uid || ""}
            />
          ))}
        </>
      )}
    </Flex>
  );
};

export { Dashboard };
