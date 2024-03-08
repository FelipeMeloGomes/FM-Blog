// React Router Dom
import { Link } from "react-router-dom";

// Estilos css
import styles from "./PostDetail.module.css";

// Hooks React
import { useEffect, useState } from "react";

// Icons
import { FaUser } from "react-icons/fa";

// Components
import LikeButton from "../LikeButton/LikeButton";
import Spinner from "../Spinner/Spinner";

const PostDetail = ({ post }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.post_detail}>
            {!loading && <Spinner height="400px" />}
            {loading && (
                <>
                    <figure className={styles.containerImg}>
                        <img
                            src={post.image}
                            loading="eager"
                            alt={post.title}
                        />
                    </figure>
                    <h2>{post.title}</h2>
                    <p className={styles.createdby}>
                        <FaUser /> {post.createdBy}
                    </p>
                    <p className={styles.block}></p>

                    <div className={styles.tags}>
                        {post.tagsArray &&
                            post.tagsArray.map((tag, index) => (
                                <div key={`${tag}_${index}`}>
                                    <p>{tag}</p>
                                </div>
                            ))}
                    </div>

                    <div className={styles.container_btn}>
                        <Link
                            to={`/posts/${post.id}`}
                            className="btn btn-outline"
                        >
                            Ler
                        </Link>
                        <LikeButton />
                    </div>
                </>
            )}
        </div>
    );
};

export default PostDetail;
