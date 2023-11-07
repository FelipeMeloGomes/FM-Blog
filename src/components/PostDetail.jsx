// React Router Dom
import { Link } from "react-router-dom";

// Estilos css
import styles from "./PostDetail.module.css";

// Components
import LikeButton from "./LikeButton";

const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <figure>
                <img
                    width="500px"
                    height="500px"
                    src={post.image}
                    alt={post.title}
                />
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
