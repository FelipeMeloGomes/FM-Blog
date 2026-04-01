import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog } from "../../components/Dialog";
import { Editor } from "../../components/Editor";
import { FormField } from "../../components/FormField";
import { type ImageFile, ImageUploader } from "../../components/ImageUploader";
import { Button } from "../../components/ui/button";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { transformCloudinaryUrl, uploadToCloudinary } from "../../lib/cloudinary";
import { type CreatePostFormData, createPostSchema } from "../../schemas";
import { EditorProvider, useEditorContext } from "../../utils/EditorContext";
import { sanitizeTag } from "../../utils/security";

const processTags = (input: string): string[] => {
  return input
    .split(",")
    .map((tag) => sanitizeTag(tag))
    .filter((tag) => tag.length > 0)
    .filter((tag, index, self) => self.indexOf(tag) === index)
    .slice(0, 10)
    .map((tag) => tag.slice(0, 30));
};

const CreatePostContent = () => {
  const navigate = useNavigate();
  const { user } = useAuthValue() || {};
  const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { insertDocument, response } = useInsertDocument("posts");
  const { getContent } = useEditorContext();

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      tagsInput: "",
    },
  });

  const { watch } = form;
  const titleValue = watch("title");
  const tagsInputValue = watch("tagsInput");

  const hasUnsavedChanges =
    titleValue.trim() || coverImage || tagsInputValue.trim() || getContent().length > 0;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isSubmitting]);

  const previewTags = useMemo(() => {
    return processTags(tagsInputValue);
  }, [tagsInputValue]);

  const titleLength = titleValue.trim().length;

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setIsOpen(true);
    } else {
      navigate("/");
    }
  };

  const onSubmit = async (data: CreatePostFormData) => {
    const content = getContent();
    const textContent = content.replace(/<[^>]*>/g, "").trim();

    if (!coverImage?.file) {
      toast.error("Imagem de capa obrigatória.");
      return;
    }

    if (textContent.length < 10) {
      toast.error("O conteúdo deve ter pelo menos 10 caracteres.");
      return;
    }

    const hasHeading = /<h[1-3][^>]*>/i.test(content);
    if (!hasHeading) {
      toast.error("O conteúdo deve ter pelo menos um título (H1, H2 ou H3).");
      return;
    }

    if (previewTags.length === 0) {
      toast.error("Tags são obrigatórias.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedUrl = await uploadToCloudinary(coverImage.file);
      const imageUrl = transformCloudinaryUrl(uploadedUrl);

      const formData = {
        title: data.title,
        titleLower: data.title.toLowerCase(),
        image: imageUrl,
        body: content,
        tagsArray: previewTags,
        uid: user?.uid || "",
        createdBy: user?.name || user?.email || "Anonymous",
        photoURL: user?.photoURL || "",
        likeCount: 0,
        likes: [],
      };

      await insertDocument(formData);
      toast.success("Post criado com sucesso!");
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar post.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex justify-start">
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <h1 className="text-2xl font-bold font-heading text-foreground">Novo post</h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        aria-label="Formulário de criação de post"
      >
        <FormField
          label="Título do post"
          placeholder="Digite o título do seu post"
          error={form.formState.errors.title?.message}
          required
          maxLength={220}
          {...form.register("title")}
        />

        <div className="flex justify-end">
          <p
            className={`text-xs ${titleLength > 200 ? "text-destructive" : "text-muted-foreground"}`}
          >
            {titleLength}/200
          </p>
        </div>

        <ImageUploader
          label="Imagem de capa"
          required
          multiple={false}
          maxFiles={1}
          maxSizeMB={5}
          minWidth={640}
          minHeight={360}
          maxWidth={3840}
          maxHeight={2160}
          onImagesChange={(images) => setCoverImage(images[0] ?? null)}
        />

        <div className="space-y-2">
          <p className="text-sm font-medium">Conteúdo *</p>
          <Editor />
        </div>

        <FormField
          label="Tags (separadas por vírgula)"
          placeholder="react, typescript, firebase"
          error={form.formState.errors.tagsInput?.message}
          required
          {...form.register("tagsInput")}
        />

        {previewTags.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Preview das tags:</p>
            <div className="flex flex-wrap gap-2">
              {previewTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || !!response.loading}>
            {isSubmitting || !!response.loading ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </form>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Sair sem salvar?"
        description="Você tem alterações não salvas. Tem certeza que deseja sair?"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
            Continuar editando
          </Button>
          <Button onClick={() => navigate("/")} className="w-full bg-red-500 hover:bg-red-600">
            Sair
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

const CreatePost = () => {
  return (
    <EditorProvider>
      <CreatePostContent />
    </EditorProvider>
  );
};

export default CreatePost;
