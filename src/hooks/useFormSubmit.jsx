// Hooks React
import { useState } from "react";

const isValidImageUrl = (url) => {
    try {
        const { protocol } = new URL(url);
        return protocol === "http:" || protocol === "https:";
    } catch (error) {
        return false;
    }
};

const clearFormFields = (titleRef, imageRef, bodyRef, tagsRef) => {
    titleRef.current.value = "";
    imageRef.current.value = "";
    bodyRef.current.value = "";
    tagsRef.current.value = "";
};

const useFormSubmit = ({
    insertDocument,
    updateDocument,
    navigate,
    titleRef,
    imageRef,
    bodyRef,
    tagsRef,
    user,
    actionType,
    postId: id,
}) => {
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        if (!isValidImageUrl(imageRef.current.value)) {
            setFormError("A imagem precisa ser uma URL válida.");
            return;
        }

        const tagsArray = tagsRef.current.value
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag);

        if (
            !titleRef.current.value ||
            !imageRef.current.value ||
            !tagsRef.current.value ||
            !bodyRef.current.value
        ) {
            setFormError("Por favor, preencha todos os campos.");
            return;
        }

        const formData = {
            title: titleRef.current.value,
            image: imageRef.current.value,
            body: bodyRef.current.value,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        switch (actionType) {
            case "create":
                insertDocument(formData);
                break;
            case "edit":
                updateDocument(id, formData);
                break;
            default:
                break;
        }

        clearFormFields(titleRef, imageRef, bodyRef, tagsRef);
        navigate("/");
    };

    return { handleSubmit, formError };
};

export default useFormSubmit;
