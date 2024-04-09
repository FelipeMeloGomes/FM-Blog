// Hooks
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useEditPost = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const titleRef = useRef("");
    const imageRef = useRef("");
    const bodyRef = useRef("");
    const tagsRef = useRef("");

    const handleInputChange = (e) => {
        const newTitle = e.target.value;
        setTimeout(() => {
            setTitle(newTitle);
        }, 250);
    };

    return {
        handleInputChange,
        title,
        navigate,
        titleRef,
        imageRef,
        bodyRef,
        tagsRef,
    };
};

export default useEditPost;
