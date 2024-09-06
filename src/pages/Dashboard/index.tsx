import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { ButtonProps, DashboardProps } from "./types";

const Dashboard = ({ createdBy }: DashboardProps) => {
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  const Button = ({ alt, children, ...rest }: ButtonProps) => (
    <button {...rest} className="btn btn-outline btn-danger" aria-label={alt}>
      {children}
    </button>
  );

  const handleDelete = (postId: string) => {
    if (user?.uid === createdBy) {
      deleteDocument(postId);
    } else {
      alert("Você não tem permissão para excluir este post.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <TextField title="Dashboard" paragraph="Gerencie os seus posts" />
      {posts?.length === 0 ? (
        <div className="text-center mb-6">
          <p className="mb-6">Não foram encontrados posts</p>
          <Link
            to="/posts/create"
            className="px-6 py-2.5 bg-transparent text-black border border-black rounded text-xs font-medium hover:bg-black hover:text-white transition ease-in-out"
          >
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-full max-w-[90%] p-4 border-b-2 border-gray-300 font-bold">
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts?.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between w-full max-w-[90%] p-2 border-b border-gray-200 gap-4 mb-8"
            >
              <p className="text-black text-base">{post.title}</p>
              <div className="flex flex-col ">
                <Link
                  to={`/posts/${post.id}`}
                  className="btn btn-outline"
                  style={{ fontSize: "12px" }}
                >
                  Ver
                </Link>
                <Link
                  to={`/posts/edit/${post.id}`}
                  className="btn btn-outline "
                  style={{ fontSize: "12px" }}
                >
                  Editar
                </Link>
                <Button
                  onClick={() => handleDelete(post.id)}
                  className="btn btn-outline btn-danger "
                  style={{ fontSize: "12px" }}
                  alt="Excluir"
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export { Dashboard };
