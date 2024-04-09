// Hooks
import { useRef, useState } from "react";
// React Router Dom
import { useNavigate } from "react-router-dom";

// Hooks
import useFormSubmit from "../utils/useFormSubmit";

const useCreatePost = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const bodyRef = useRef(null);
    const tagsRef = useRef(null);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const { handleSubmit, formError } = useFormSubmit({
        insertDocument: null,
        navigate,
        titleRef,
        imageRef,
        bodyRef,
        tagsRef,
        user: null,
        actionType: "create",
    });

    const handleInputChange = (e) => {
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
        imageUrl,
        bodyRef,
        tagsRef,
        navigate,
        handleSubmit,
        formError,
        handleInputChange,
        errorParagraph,
        error,
    };
};

export default useCreatePost;
