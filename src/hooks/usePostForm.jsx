import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const usePostForm = () => {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const bodyRef = useRef(null);
    const tagsRef = useRef(null);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setError("");
        };
        img.onerror = () => {
            setError("A URL inserida não corresponde a uma imagem válida.");
        };
    };

    const errorParagraph = (errorMessage) => (
        <p className="error">{errorMessage}</p>
    );

    return {
        titleRef,
        imageRef,
        bodyRef,
        tagsRef,
        navigate,
        title,
        imageUrl,
        error,
        handleTitleChange,
        handleImageUrlChange,
        errorParagraph,
    };
};

export default usePostForm;
