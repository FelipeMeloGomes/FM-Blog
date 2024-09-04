import styles from "./Post.module.css";
import { useParams, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Spinner } from "../../components/Spinner";
import { LikeButton } from "../../components/LikeButton";
import { Icon } from "../../components/IconComponent";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";

const Post = () => {
  const { user } = useAuthValue();
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const uid = user?.uid;
  const { documents: posts } = useFetchDocuments("posts", null, uid);

  return (
    <section className={styles.post_container}>
      {loading ? (
        <Spinner />
      ) : (
        post && (
          <>
            <div className={styles.containerImg}>
              <figure>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.card__image}
                  loading="lazy"
                />
              </figure>
              <p className={styles.createdby}>Por: {post.createdBy}</p>
            </div>
            <div>
              <h1 className={styles.containerTitle}>{post.title}</h1>
              <div
                className={styles.bodyText}
                dangerouslySetInnerHTML={{
                  __html: post.body,
                }}
              />
            </div>
            <div className={styles.containerText}>
              <h3 className={styles.titleh3}>Este post trata sobre:</h3>
            </div>
            <div className={styles.tags}>
              {post?.tagsArray?.map((tag: string, index: number) => (
                <p key={`${tag}_${index}`}>{tag}</p>
              ))}
            </div>

            <div className={styles.btnArrow}>
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
