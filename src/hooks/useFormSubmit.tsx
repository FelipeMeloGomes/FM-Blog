import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
    uid: string;
    displayName: string;
}

interface FormSubmitHook {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formError: string;
}

interface FormData {
    title: string;
    image: string;
    body: string;
    tagsArray: string[];
    uid: string;
    createdBy: string;
}

interface FormSubmitProps {
    insertDocument: (formData: FormData) => void;
    updateDocument: (id: string, formData: FormData) => void;
    navigate: ReturnType<typeof useNavigate>;
    titleRef: React.MutableRefObject<HTMLInputElement | null>;
    imageRef: React.MutableRefObject<HTMLInputElement | null>;
    bodyRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    tagsRef: React.MutableRefObject<HTMLInputElement | null>;
    user: User;
    actionType: "create" | "edit";
    postId: string;
}

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
}: FormSubmitProps): FormSubmitHook => {
    const [formError, setFormError] = useState("");

    const isValidImageUrl = (url: string): boolean => {
        try {
            const { protocol } = new URL(url);
            return protocol === "http:" || protocol === "https:";
        } catch (error) {
            return false;
        }
    };

    const isFormValid = (): boolean => {
        return (
            !!titleRef.current?.value &&
            !!imageRef.current?.value &&
            !!tagsRef.current?.value &&
            !!bodyRef.current?.value
        );
    };

    const createFormData = (): FormData => {
        const tagsArray =
            tagsRef.current?.value
                .split(",")
                .map((tag) => tag.trim().toLowerCase())
                .filter((tag) => tag) || [];
        return {
            title: titleRef.current?.value || "",
            image: imageRef.current?.value || "",
            body: bodyRef.current?.value || "",
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };
    };

    const handleAction = (formData: FormData): void => {
        if (actionType === "create") {
            insertDocument(formData);
        } else if (actionType === "edit") {
            updateDocument(id, formData);
        }
    };

    const clearFormFields = (): void => {
        titleRef.current && (titleRef.current.value = "");
        imageRef.current && (imageRef.current.value = "");
        bodyRef.current && (bodyRef.current.value = "");
        tagsRef.current && (tagsRef.current.value = "");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setFormError("");

        if (!isValidImageUrl(imageRef.current?.value || "")) {
            setFormError("A imagem precisa ser uma URL válida.");
            return;
        }

        if (!isFormValid()) {
            setFormError("Por favor, preencha todos os campos.");
            return;
        }

        const formData = createFormData();
        handleAction(formData);
        toast.success("Documento criado com sucesso!");

        clearFormFields();
        navigate("/");
    };

    return { handleSubmit, formError };
};
