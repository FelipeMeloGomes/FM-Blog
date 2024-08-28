import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";
import { useEffect, useState } from "react";
import { LikeButton } from "../LikeButton";
import { Spinner } from "../Spinner";
import { Icon } from "../IconComponent";
import { PostDetailProps } from "../../utils/SortPost/types";

const PostDetail = ({ post }: PostDetailProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={styles.post_detail}>
      {!loading && <Spinner width="350px" />}
      {loading && (
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
            {post?.tagsArray.map((tag: string, index: number) => (
              <div key={`${tag}_${index}`}>
                <p>{tag}</p>
              </div>
            ))}
          </div>

          <div className={styles.container_btn}>
            <Link to={`/posts/${post.id}`} className="btn btn-outline">
              Ler
            </Link>
            <LikeButton />
          </div>
        </>
      )}
    </div>
  );
};

export { PostDetail };
