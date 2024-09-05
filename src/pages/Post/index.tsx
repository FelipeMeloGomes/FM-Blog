import { useParams, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Spinner } from "../../components/Spinner";
import { LikeButton } from "../../components/LikeButton";
import { Icon } from "../../components/IconComponent";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";

const Post = () => {
  const { user } = useAuthValue() || {};
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const uid = user?.uid;
  const { documents: posts } = useFetchDocuments("posts", null, uid);

  return (
    <section className="flex flex-col max-w-[90%] w-[800px] p-6 rounded-2xl mx-auto my-10 shadow-lg">
      {loading ? (
        <Spinner />
      ) : (
        post && (
          <>
            <div className="mt-8 w-full max-w-full mx-auto mb-8 rounded-lg ">
              <figure>
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-contain w-full max-w-full"
                  loading="lazy"
                />
              </figure>
              <p className="italic text-center text-gray-600 text-sm my-6">
                Por: {post.createdBy}
              </p>
            </div>
            <div>
              <h1 className="text-2xl text-left leading-6 font-bold mb-6">
                {post.title}
              </h1>
              <div
                className="text-left mt-4 mx-auto max-w-full"
                dangerouslySetInnerHTML={{
                  __html: post.body,
                }}
              />
            </div>
            <div className="mt-8">
              <h3 className="mt-6 mb-6 text-xl">Este post trata sobre:</h3>
            </div>
            <div className="w-full flex justify-center gap-4 flex-wrap">
              {post?.tagsArray?.map((tag: string, index: number) => (
                <p
                  key={`${tag}_${index}`}
                  className="inline-flex text-base justify-center px-2 py-1 bg-black text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
                >
                  {tag}
                </p>
              ))}
            </div>
            <div className="flex gap-4 mt-8 items-center justify-between w-full">
              <Link to="/" className="btn btn-outline">
                <Icon name="ArrowBack" className="icon_font" />
              </Link>
              <LikeButton postId={post.id} userId={user?.uid || ""} />
            </div>
          </>
        )
      )}
    </section>
  );
};

export { Post };
