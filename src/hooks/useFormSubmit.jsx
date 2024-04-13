// Hooks React
import { useState } from "react";

export const useFormSubmit = ({
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

    const isValidImageUrl = (url) => {
        try {
            const { protocol } = new URL(url);
            return protocol === "http:" || protocol === "https:";
        } catch (error) {
            return false;
        }
    };

    const isFormValid = () => {
        return (
            titleRef.current.value &&
            imageRef.current.value &&
            tagsRef.current.value &&
            bodyRef.current.value
        );
    };

    const createFormData = () => {
        const tagsArray = tagsRef.current.value
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag);
        return {
            title: titleRef.current.value,
            image: imageRef.current.value,
            body: bodyRef.current.value,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };
    };

    const handleAction = (formData) => {
        if (actionType === "create") {
            insertDocument(formData);
        } else if (actionType === "edit") {
            updateDocument(id, formData);
        }
    };

    const clearFormFields = () => {
        titleRef.current.value = "";
        imageRef.current.value = "";
        bodyRef.current.value = "";
        tagsRef.current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        if (!isValidImageUrl(imageRef.current.value)) {
            setFormError("A imagem precisa ser uma URL válida.");
            return;
        }

        if (!isFormValid()) {
            setFormError("Por favor, preencha todos os campos.");
            return;
        }

        const formData = createFormData();
        handleAction(formData);

        clearFormFields();
        navigate("/");
    };

    return { handleSubmit, formError };
};


