import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSearchPost } from "../../hooks/useSearchPost";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PostDetail } from "../../components/PostDetail";
import { Spinner } from "../../components/Spinner";
import { TextField } from "../../components/TextField";
import { Icon } from "../../components/IconComponent";

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");
  const { handleSubmit, setQuery, setSortedPosts } = useSearchPost();

  useEffect(() => {
    if (posts) {
      setSortedPosts(posts);
    }
  }, [posts, setSortedPosts]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center home">
      <TextField margin="0 0.7em" title="Veja os nossos posts mais recentes" />
      <form
        className="w-full max-w-xl flex justify-center mb-12 gap-2 search_form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Ou busque por tags..."
          className="w-[50%] text-base pl-5 search_form-input"
          alt="Busque por tags"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <button className="btn btn-dark w[100px]" aria-label="Pesquisar">
          <Icon name="Search" className="icon_font" />
        </button>
      </form>
      <div className="post-list">
        {posts?.length === 0 && (
          <div className="text-center noposts">
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {posts?.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export { Home };
