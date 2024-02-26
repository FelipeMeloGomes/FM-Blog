import { useState } from "react";

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

        try {
            new URL(imageRef.current.value);
        } catch (error) {
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

        switch (actionType) {
            case "create":
                insertDocument({
                    title: titleRef.current.value,
                    image: imageRef.current.value,
                    body: bodyRef.current.value,
                    tagsArray,
                    uid: user.uid,
                    createdBy: user.displayName,
                });
                break;
            case "edit":
                updateDocument(id, {
                    title: titleRef.current.value,
                    image: imageRef.current.value,
                    body: bodyRef.current.value,
                    tagsArray,
                    uid: user.uid,
                    createdBy: user.displayName,
                });
                break;
            default:
                break;
        }

        titleRef.current.value = "";
        imageRef.current.value = "";
        bodyRef.current.value = "";
        tagsRef.current.value = "";

        navigate("/");
    };

    return { handleSubmit, formError };
};

export default useFormSubmit;
