import { useRef, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PostFormHook, UsePostFormProps } from "./types";

export const usePostForm = ({
  existingLikes = [],
}: UsePostFormProps): PostFormHook => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [likes, setLikes] = useState<string[]>(existingLikes);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
  };

  const validateImageUrl = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => setError("");
    img.onerror = () =>
      setError("A URL inserida não corresponde a uma imagem válida.");
  };

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
    likes,
    setLikes,
    error,
    setError,
    handleChange,
    validateImageUrl,
  };
};
