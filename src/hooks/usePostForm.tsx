import { useRef, useState, ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface PostFormHook {
  titleRef: React.RefObject<HTMLInputElement>;
  imageRef: React.RefObject<HTMLInputElement>;
  bodyRef: React.RefObject<HTMLTextAreaElement>;
  tagsRef: React.RefObject<HTMLInputElement>;
  navigate: ReturnType<typeof useNavigate>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  validateImageUrl: (url: string) => void;
  errorParagraph: (errorMessage: string) => JSX.Element;
}

export const usePostForm = (): PostFormHook => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "image":
          setImageUrl(value);
          validateImageUrl(value);
          break;
        default:
          break;
      }
    },
    [],
  );

  const validateImageUrl = useCallback((url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => setError("");
    img.onerror = () =>
      setError("A URL inserida não corresponde a uma imagem válida.");
  }, []);

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
    handleChange,
    validateImageUrl,
    errorParagraph,
  };
};
