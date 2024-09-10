import { Link } from "react-router-dom";
import { DeleteButton } from "../DeleteButton";
import { PostItemProps } from "./types";

const PostItem = ({ post, handleDelete, createdBy, userId }: PostItemProps) => {
  const canDelete = userId === createdBy;

  return (
    <div
      key={post.id}
      className="flex items-center justify-between w-full max-w-[90%] p-2 border-b border-gray-200 gap-4 mb-8"
    >
      <p className="text-black text-base">{post.title}</p>
      <div className="flex flex-col">
        <Link
          to={`/posts/${post.id}`}
          className="btn btn-outline "
          style={{ fontSize: "12px" }}
        >
          Ver
        </Link>
        <Link
          to={`/posts/edit/${post.id}`}
          className="btn btn-outline"
          style={{ fontSize: "12px" }}
        >
          Editar
        </Link>
        {canDelete && (
          <DeleteButton
            onClick={() => handleDelete(post.id)}
            style={{ fontSize: "12px" }}
            alt="Excluir"
          >
            Excluir
          </DeleteButton>
        )}
      </div>
    </div>
  );
};

export default PostItem;
