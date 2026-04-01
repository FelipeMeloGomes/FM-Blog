import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog } from "../../components/Dialog";
import { type ImageFile, ImageUploader } from "../../components/ImageUploader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { transformCloudinaryUrl, uploadToCloudinary } from "../../lib/cloudinary";
import { type CreatePostFormData, createPostSchema } from "../../schemas";
import { EditorProvider } from "../../utils/EditorContext";
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

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
      tagsInput: "",
    },
  });

  const { watch } = form;
  const titleValue = watch("title");
  const tagsInputValue = watch("tagsInput");
  const bodyValue = watch("body");

  const hasUnsavedChanges =
    titleValue.trim() || coverImage || tagsInputValue.trim() || bodyValue.trim();

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
    if (!coverImage?.file) {
      toast.error("Imagem de capa obrigatória.");
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
        body: data.body,
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
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm">
            Título do post *
          </Label>
          <Input
            id="title"
            placeholder="Digite o título do seu post"
            {...form.register("title")}
            maxLength={220}
            aria-describedby={form.formState.errors.title ? "title-error" : undefined}
            aria-invalid={!!form.formState.errors.title}
          />
          <div className="flex justify-between">
            {form.formState.errors.title ? (
              <p
                id="title-error"
                className="text-xs text-destructive"
                role="alert"
                aria-live="polite"
              >
                {form.formState.errors.title.message}
              </p>
            ) : (
              <div />
            )}
            <p
              className={`text-xs ${titleLength > 200 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {titleLength}/200
            </p>
          </div>
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
          <Label htmlFor="body" className="text-sm">
            Conteúdo *
          </Label>
          <Textarea
            id="body"
            placeholder="Escreva o conteúdo do seu post..."
            minLength={10}
            {...form.register("body")}
            className="min-h-[300px] resize-y"
            aria-describedby={form.formState.errors.body ? "body-error" : undefined}
            aria-invalid={!!form.formState.errors.body}
          />
          {form.formState.errors.body && (
            <p id="body-error" className="text-xs text-destructive" role="alert" aria-live="polite">
              {form.formState.errors.body.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagsInput" className="text-sm">
            Tags (separadas por vírgula) *
          </Label>
          <Input
            id="tagsInput"
            placeholder="react, typescript, firebase"
            {...form.register("tagsInput")}
            aria-describedby={form.formState.errors.tagsInput ? "tags-error" : undefined}
            aria-invalid={!!form.formState.errors.tagsInput}
          />
          {form.formState.errors.tagsInput && (
            <p id="tags-error" className="text-xs text-destructive" role="alert" aria-live="polite">
              {form.formState.errors.tagsInput.message}
            </p>
          )}
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
        </div>

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
