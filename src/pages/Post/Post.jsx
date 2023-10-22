// CSS
import styles from "./Post.module.css";

// react router dom
import { useParams } from "react-router-dom";

// hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";

//components
import Spinner from "../../components/Spinner";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);
    return (
        <div className={`${styles.post_container} ${styles.card}`}>
            {loading && <Spinner />}
            {post && (
                <>
                    <div className={styles.card__img}>
                        <img
                            src={post.image}
                            alt={post.title}
                            className={styles.card__img}
                        />
                    </div>
                    <div className={styles.card_int}>
                        <p className={styles.card_int__title}>{post.title}</p>
                        <p className={styles.excerpt}>{post.body}</p>
                    </div>
                    <h3>Este post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
