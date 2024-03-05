// Estilos css
import styles from "./Post.module.css";

// React Router Dom
import { useParams, Link } from "react-router-dom";

// Icons
import { MdArrowBack } from "react-icons/md";

// Hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";

// Components
import Spinner from "../../components/Spinner/Spinner";
import LikeButton from "../../components/LikeButton/LikeButton";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);
    return (
        <>
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
                                    />
                                </figure>
                                <p className={styles.createdby}>
                                    Por: {post.createdBy}
                                </p>
                            </div>
                            <div>
                                <h1 className={styles.containerTitle}>
                                    {post.title}
                                </h1>
                                <div
                                    className={styles.bodyText}
                                    dangerouslySetInnerHTML={{
                                        __html: post.body,
                                    }}
                                />
                            </div>
                            <div className={styles.containerText}>
                                <h3 className={styles.titleh3}>
                                    Este post trata sobre:
                                </h3>
                            </div>
                            <div className={styles.tags}>
                                {post.tagsArray &&
                                    post.tagsArray.map((tag, index) => (
                                        <p key={`${tag}_${index}`}>{tag}</p>
                                    ))}
                            </div>

                            <div className={styles.btnArrow}>
                                <Link to="/" className="btn btn-outline">
                                    <MdArrowBack className="icon_font" />
                                </Link>
                                <LikeButton />
                            </div>
                        </>
                    )
                )}
            </div>
        </>
    );
};

export default Post;
