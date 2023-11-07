import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";
import LikeButton from "./LikeButton";

const LazyImage = ({ src, alt }) => {
    const imageRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setImageSrc(src);
                    observer.disconnect();
                }
            });
        });

        observer.observe(imageRef.current);

        return () => {
            observer.disconnect();
        };
    }, [src]);

    return (
        <img
            width="500px"
            height="500px"
            ref={imageRef}
            src={imageSrc}
            alt={alt}
            loading="lazy"
        />
    );
};

const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <figure>
                <LazyImage src={post.image} alt={post.title} />
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
