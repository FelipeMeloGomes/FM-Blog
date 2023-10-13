// react router dom
import { Link } from "react-router-dom";
// css
import styles from "./PostDetail.module.css";
// components
import LikeButton from "./LikeButton";

const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.createdby}>{post.createdBy}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
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
