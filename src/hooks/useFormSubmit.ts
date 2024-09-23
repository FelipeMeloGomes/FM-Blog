import { useState } from "react";
import { useToastNotification } from "./useToastNotification";
import { FormSubmitHook, FormSubmitProps, FormData } from "./types";

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
  existingLikes = [],
}: FormSubmitProps): FormSubmitHook => {
  const [formError, setFormError] = useState("");
  const { showToast } = useToastNotification();

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
      likeCount: existingLikes.length,
      likes: existingLikes,
    };
  };

  const handleAction = async (formData: FormData): Promise<void> => {
    try {
      if (actionType === "create") {
        await insertDocument(formData);
        showToast({
          title: "Success",
          description: "Documento criado com sucesso!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } else if (actionType === "edit") {
        await updateDocument(id, formData);
        showToast({
          title: "Success",
          description: "Documento atualizado com sucesso!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "Erro ao salvar documento.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
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

    clearFormFields();
    navigate("/");
  };

  return { handleSubmit, formError };
};
