// React Router Dom
import { Link } from "react-router-dom";

// Estilos css
import styles from "./PostDetail.module.css";

// Icons
import { FaUser } from "react-icons/fa";

// Components
import LikeButton from "../LikeButton/LikeButton";

const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <figure className={styles.containerImg}>
                <div style={{ display: "none" }}>
                    <img src={post.image} alt={post.title} />
                </div>
                <img src={post.image} alt={post.title} />
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
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ler
                </Link>
                <LikeButton />
            </div>
        </div>
    );
};

export default PostDetail;
