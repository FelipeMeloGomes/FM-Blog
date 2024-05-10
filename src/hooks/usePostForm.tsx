import { useRef, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface PostFormHook {
    titleRef: React.MutableRefObject<HTMLInputElement | null>;
    imageRef: React.MutableRefObject<HTMLInputElement | null>;
    bodyRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    tagsRef: React.MutableRefObject<HTMLInputElement | null>;
    navigate: ReturnType<typeof useNavigate>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImageUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errorParagraph: (errorMessage: string) => JSX.Element;
}

export const usePostForm = (): PostFormHook => {
    const navigate = useNavigate();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);
    const tagsRef = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    };

    const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const errorParagraph = (errorMessage: string) => (
        <p className="error">{errorMessage}</p>
    );

    return {
        titleRef,
        imageRef,
        bodyRef,
        tagsRef,
        navigate,
        title,
        setTitle,
        imageUrl,
        setImageUrl,
        error,
        setError,
        handleTitleChange,
        handleImageUrlChange,
        errorParagraph,
    };
};
