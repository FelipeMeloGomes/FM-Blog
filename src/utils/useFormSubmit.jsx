import { useState } from "react";

const useFormSubmit = ({
    insertDocument,
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

        // valida image url
        try {
            new URL(imageRef.current.value);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
            return;
        }

        // criar o array de tags
        const tagsArray = tagsRef.current.value
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag);

        // checar todos os valores
        if (
            !titleRef.current.value ||
            !imageRef.current.value ||
            !tagsRef.current.value ||
            !bodyRef.current.value
        ) {
            setFormError("Por Favor, preencha todos os campos!");
            return;
        }

        // Determina a ação com base no tipo de ação
        switch (actionType) {
            case "create":
                // Inserir o documento correto no form
                insertDocument({
                    title: titleRef.current.value,
                    image: imageRef.current.value,
                    body: bodyRef.current.value,
                    tagsArray,
                    uid: user.uid,
                    createdBy: user.displayName,
                });
                break;
            case "delete":
                // Lógica para deletar documento
                break;
            case "edit":
                break;
            default:
                break;
        }

        // Limpa os campos após o envio
        titleRef.current.value = "";
        imageRef.current.value = "";
        bodyRef.current.value = "";
        tagsRef.current.value = "";

        // redirect to home page
        navigate("/");
    };

    return { handleSubmit, formError };
};

export default useFormSubmit;
