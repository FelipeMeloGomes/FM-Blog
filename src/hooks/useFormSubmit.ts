import { useState } from "react";
import { useEditorContext } from "../utils/EditorContext";
import type { FormData, FormSubmitHook, FormSubmitProps } from "./types";
import { useToastNotification } from "./useToastNotification";

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
  const { content: editorContent } = useEditorContext();

  const isValidImageUrl = (url: string): boolean => {
    try {
      const { protocol } = new URL(url);
      return protocol === "http:" || protocol === "https:";
    } catch {
      return false;
    }
  };

  const isFormValid = (): boolean => {
    const bodyContent = bodyRef?.current?.value || editorContent || "";
    return (
      !!titleRef.current?.value &&
      !!imageRef.current?.value &&
      !!tagsRef.current?.value &&
      !!bodyContent.trim()
    );
  };

  const createFormData = (): FormData => {
    const tagsArray =
      tagsRef.current?.value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag) || [];
    const bodyContent = bodyRef?.current?.value || editorContent || "";
    return {
      title: titleRef.current?.value || "",
      image: imageRef.current?.value || "",
      body: bodyContent,
      tagsArray,
      uid: user?.uid || "",
      createdBy: user?.displayName || "",
      likeCount: existingLikes.length,
      likes: existingLikes,
    };
  };

  const handleAction = async (formData: FormData): Promise<void> => {
    try {
      if (actionType === "create" && insertDocument) {
        await insertDocument(formData);
        showToast({
          title: "Success",
          description: "Documento criado com sucesso!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } else if (actionType === "edit" && updateDocument) {
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
    } catch {
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
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    if (tagsRef.current) {
      tagsRef.current.value = "";
    }
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
