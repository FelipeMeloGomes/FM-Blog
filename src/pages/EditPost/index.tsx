import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type ImageFile, ImageUploader } from "../../components/ImageUploader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { transformCloudinaryUrl, uploadToCloudinary } from "../../lib/cloudinary";
import { usePost } from "../../lib/hooks/usePostsQuery";
import { type EditPostFormData, editPostSchema } from "../../schemas";
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

const EditPostContent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthValue() || {};
  const { data: post, isLoading } = usePost(id);
  const { updateDocument, response } = useUpdateDocument("posts");

  const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: "",
      tagsInput: "",
    },
  });

  const { watch, setValue } = form;
  const titleValue = watch("title");
  const tagsInputValue = watch("tagsInput");

  useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("tagsInput", post.tagsArray?.join(", ") || "");
      if (post.image) {
        setCoverImage({
          id: "initial",
          file: null,
          preview: post.image,
        });
      }
    }
  }, [post, setValue]);

  const previewTags = useMemo(() => {
    return processTags(tagsInputValue);
  }, [tagsInputValue]);

  const titleLength = titleValue.trim().length;

  const onSubmit = async (data: EditPostFormData) => {
    if (!coverImage) {
      toast.error("Imagem de capa obrigatória.");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = post?.image || "";

      if (coverImage.file) {
        const uploadedUrl = await uploadToCloudinary(coverImage.file);
        imageUrl = transformCloudinaryUrl(uploadedUrl);
      }

      const formData = {
        title: data.title,
        titleLower: data.title.toLowerCase(),
        image: imageUrl,
        body: String(post?.body || ""),
        tagsArray: previewTags,
        uid: user?.uid || post?.uid || "",
        createdBy: post?.createdBy || user?.name || user?.email || "Anonymous",
        photoURL: post?.photoURL || user?.photoURL || "",
        likeCount: post?.likeCount || 0,
        likes: post?.likes || [],
      };

      await updateDocument(id!, formData);
      toast.success("Post atualizado com sucesso!");
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar post.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (!post) {
    return <div>Post não encontrado</div>;
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const parts = tagsInputValue
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const tagIndex = parts.findIndex((t) => t.toLowerCase() === tagToRemove);
    if (tagIndex !== -1) {
      parts.splice(tagIndex, 1);
      setValue("tagsInput", parts.join(", "));
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex justify-start">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <h1 className="text-2xl font-bold font-heading text-foreground">Editar post</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm">
            Título do post *
          </Label>
          <Input
            id="title"
            placeholder="Digite o título do seu post"
            {...form.register("title")}
            maxLength={220}
          />
          <div className="flex justify-between">
            {form.formState.errors.title ? (
              <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
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
          initialImageUrl={post.image}
          onImagesChange={(images) => {
            setCoverImage(images[0] ?? null);
          }}
        />

        <div className="space-y-2">
          <Label htmlFor="tagsInput" className="text-sm">
            Tags (separadas por vírgula) *
          </Label>
          <Input
            id="tagsInput"
            placeholder="react, typescript, firebase"
            {...form.register("tagsInput")}
          />
          {form.formState.errors.tagsInput && (
            <p className="text-xs text-destructive">{form.formState.errors.tagsInput.message}</p>
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
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || !!response.loading}>
            {isSubmitting || !!response.loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const EditPost = () => {
  return (
    <EditorProvider>
      <EditPostContent />
    </EditorProvider>
  );
};

export default EditPost;
