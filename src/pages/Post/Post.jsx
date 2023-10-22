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
        <div className={styles.post_container}>
            {loading && <Spinner />}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
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
