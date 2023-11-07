// React Router Dom
import { Link } from "react-router-dom";

// Estilos css
import styles from "./PostDetail.module.css";

// React
import { useEffect, useState } from "react";

// Components
import LikeButton from "./LikeButton";

const PostDetail = ({ post }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = post.image;
        img.onload = () => {
            // A imagem foi carregada com sucesso
            setImageLoaded(true);
        };
    }, [post.image]);
    return (
        <div className={styles.post_detail}>
            <figure>
                {imageLoaded ? (
                    <img
                        width="500px"
                        height="500px"
                        src={post.image}
                        alt={post.title}
                    />
                ) : (
                    <div>Loading...</div>
                )}
            </figure>
            <h2>{post.title}</h2>
            <p className={styles.createdby}>{post.createdBy}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <div key={tag}>
                        <p key={tag}>
                            <span>#</span>
                            {tag}
                        </p>
                    </div>
                ))}
            </div>
            <div className={styles.container_btn}>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ler
                </Link>
                <LikeButton />
            </div>
        </div>
    );
};

export default PostDetail;
