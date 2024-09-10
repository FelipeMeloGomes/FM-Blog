import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSearchPost } from "../../hooks/useSearchPost";
import { useEffect } from "react";
import { TextField } from "../../components/TextField";
import { SearchForm } from "../../components/SearchForm";
import { PostList } from "../../components/PostList";
import { NoPosts } from "../../components/NoPosts";

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
    <div className="flex flex-col items-center justify-center home">
      <TextField margin="0 0.7em" title="Veja os nossos posts mais recentes" />
      <SearchForm handleSubmit={handleSubmit} setQuery={setQuery} />
      {posts?.length === 0 ? <NoPosts /> : <PostList posts={posts} />}
    </div>
  );
};

export { Home };
