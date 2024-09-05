import { Link } from "react-router-dom";
import { LikeButton } from "../LikeButton";
import { Spinner } from "../Spinner";
import { Icon } from "../IconComponent";
import { PostDetailProps } from "../../utils/SortPost/types";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { toast } from "react-toastify";

const PostDetail = ({ post }: PostDetailProps) => {
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const handleNotLoggedIn = () => {
    toast.error(
      "Você precisa estar logado para curtir este post. Por favor, faça o login ou registre-se para participar.",
    );
  };

  if (loading) {
    return;
  }

  return (
    <div className="flex flex-col items-center shadow-[0px_-2px_10px_rgba(0,0,0,0.15)] rounded-[20px] max-w-[350px] mb-[2em]">
      {loading ? (
        <Spinner width="350px" />
      ) : (
        <>
          <figure className="object-cover max-w-full w-full">
            <img src={post.image} loading="eager" alt={post.title} />
          </figure>
          <h2 className="mb-[1.5em] font-bold text-[1.5em] max-w-[90%] flex justify-center text-left">
            {post.title}
          </h2>
          <p className="italic text-[#444] text-[0.8em] mb-[1.5em] flex items-center  gap-2">
            <Icon name="User" /> {post.createdBy}
          </p>
          <div className="border border-black mb-[1em] w-full"></div>

          <div className="mb-[1.5em] gap-[16px] flex flex-wrap justify-center">
            {post.tagsArray.map((tag: string, index: number) => (
              <div key={`${tag}_${index}`}>
                <p className="inline-flex text-base justify-center px-[0.5em] bg-black text-white rounded-[20px] max-w-[150px] cursor-pointer transition-transform duration-300 ease-in-out capitalize hover:scale-110">
                  {tag}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-[1em] justify-around mb-[2em] w-full max-w-[90%]">
            <Link to={`/posts/${post.id}`} className="btn btn-outline">
              Ler
            </Link>
            <LikeButton
              postId={post.id}
              onNotLoggedIn={handleNotLoggedIn}
              userId={user?.uid}
            />
          </div>
        </>
      )}
    </div>
  );
};

export { PostDetail };
