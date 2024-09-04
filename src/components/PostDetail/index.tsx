import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";
import { LikeButton } from "../LikeButton";
import { Spinner } from "../Spinner";
import { Icon } from "../IconComponent";
import { PostDetailProps } from "../../utils/SortPost/types";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const PostDetail = ({ post }: PostDetailProps) => {
  const { user } = useAuthValue();
  const uid = user?.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  if (loading) {
    return;
  }

  return (
    <div className={styles.post_detail}>
      {loading ? (
        <Spinner width="350px" />
      ) : (
        <>
          <figure className={styles.containerImg}>
            <img src={post.image} loading="eager" alt={post.title} />
          </figure>
          <h2>{post.title}</h2>
          <p className={styles.createdby}>
            <Icon name="User" /> {post.createdBy}
          </p>
          <p className={styles.block}></p>

          <div className={styles.tags}>
            {post.tagsArray.map((tag: string, index: number) => (
              <div key={`${tag}_${index}`}>
                <p>{tag}</p>
              </div>
            ))}
          </div>

          <div className={styles.container_btn}>
            <Link to={`/posts/${post.id}`} className="btn btn-outline">
              Ler
            </Link>
            {user && <LikeButton postId={post.id} userId={user.uid} />}
          </div>
        </>
      )}
    </div>
  );
};

export { PostDetail };
