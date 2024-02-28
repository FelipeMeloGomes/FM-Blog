// Estilos css
import styles from "./Post.module.css";

// React Router Dom
import { useParams } from "react-router-dom";

// Icons
import { FiHash } from "react-icons/fi";

// Hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";

// Components
import Spinner from "../../components/Spinner/Spinner";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);
    return (
        <div className={styles.post_container}>
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
                                    width="500px"
                                />
                            </figure>
                        </div>
                        <div>
                            <p className={styles.createdby}>
                                Por: {post.createdBy}
                            </p>
                        </div>
                        <div>
                            <h1>{post.title}</h1>
                            <div
                                className={styles.bodyText}
                                dangerouslySetInnerHTML={{ __html: post.body }}
                            />
                        </div>

                        <div className={styles.containerText}>
                            <h3>Este post trata sobre:</h3>
                        </div>
                        <div className={styles.tags}>
                            {post.tagsArray &&
                                post.tagsArray.map((tag, index) => (
                                    <p key={`${tag}_${index}`}>
                                        <span>
                                            <FiHash />
                                        </span>
                                        {tag}
                                    </p>
                                ))}
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default Post;
