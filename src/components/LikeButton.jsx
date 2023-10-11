import React, { useState } from "react";

function LikeButton() {
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    return (
        <div>
            <button className="btn btn-outline" onClick={handleLikeClick}>
                {likes > 0 ? `Curtidas ${likes}` : "Curtidas"}
            </button>
        </div>
    );
}

export default LikeButton;
