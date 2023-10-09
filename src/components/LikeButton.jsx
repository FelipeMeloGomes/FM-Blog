import React, { useState } from "react";
import styles from "./LikeButton.module.css";

function LikeButton() {
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    return (
        <div>
            <button className={styles.btn_clique} onClick={handleLikeClick}>
                Curtir {likes}
            </button>
        </div>
    );
}

export default LikeButton;
