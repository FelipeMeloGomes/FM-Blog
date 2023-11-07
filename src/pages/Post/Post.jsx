// Estilos css
import styles from "./Post.module.css";

// React Router Dom
import { useParams } from "react-router-dom";

// Hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";

// Components
import Spinner from "../../components/Spinner";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);
    return (
        <div className={`${styles.post_container} ${styles.card}`}>
            {loading && <Spinner />}
            {post && (
                <>
                    <figure className={styles.card__img}>
                        <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className={styles.card__img}
                        />
                    </figure>
                    <div>
                        <p className={styles.createdby}>{post.createdBy}</p>
                    </div>
                    <div>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
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
