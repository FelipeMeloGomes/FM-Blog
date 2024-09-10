import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { handleDeletePost } from "../../utils/HandleDelete";
import PostItem from "../../components/PostItem";
import { NoPostsMessage } from "../../components/NoPostsMessage";

const Dashboard = ({ createdBy }: { createdBy: string }) => {
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <TextField title="Dashboard" paragraph="Gerencie os seus posts" />
      {posts?.length === 0 ? (
        <NoPostsMessage />
      ) : (
        <>
          <div className="flex justify-between w-full max-w-[90%] p-4 border-b-2 border-gray-300 font-bold">
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts?.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              handleDelete={() =>
                handleDeletePost(post.id, createdBy, user?.uid, deleteDocument)
              }
              createdBy={createdBy}
              userId={user?.uid}
            />
          ))}
        </>
      )}
    </div>
  );
};

export { Dashboard };
