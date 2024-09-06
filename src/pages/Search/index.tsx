import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import { PostDetail } from "../../components/PostDetail";
import { TextField } from "../../components/TextField";
import { Icon } from "../../components/IconComponent";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);
  return (
    <div className="flex flex-col items-center justify-center text-center mb-20 mx-auto">
      <TextField
        title="Procurar"
        paragraph={`Resultados encontrados para: ${search}`}
      />

      {posts && posts?.length > 0 && (
        <div className="flex items-center mb-8">
          <Link to="/" className="btn btn-outline">
            <Icon name="ArrowBack" className="icon_font" />
          </Link>
        </div>
      )}

      <div className="flex flex-row flex-wrap gap-10 max-w-[90%] justify-center mx-auto">
        {posts?.length === 0 && (
          <div className="text-center mb-8">
            <p className="mb-8">
              Não foram encontrados posts a partir da sua busca...
            </p>

            <Link to="/" className="btn btn-dark">
              Voltar
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

export { Search };
