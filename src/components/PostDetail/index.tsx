// React Router Dom
import { Link } from "react-router-dom";

// Estilos css
import styles from "./PostDetail.module.css";

// Hooks React
import { useEffect, useState } from "react";

// Components
import { LikeButton } from "../LikeButton";
import { Spinner } from "../Spinner";
import { Icon } from "../IconComponent";
import { Post } from "./types";

const PostDetail: React.FC<Post> = ({ post }) => {
    console.log(post);
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
                        <img
                            src={post.image}
                            loading="eager"
                            alt={post.title}
                        />
                    </figure>
                    <h2>{post.title}</h2>
                    <p className={styles.createdby}>
                        <Icon name="user" /> {post.createdBy}
                    </p>
                    <p className={styles.block}></p>

                    <div className={styles.tags}>
                        {post?.tagsArray.map((tag, index) => (
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

export { PostDetail };
