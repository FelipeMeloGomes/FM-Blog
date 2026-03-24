import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { type ImageFile, ImageUploader } from "../../components/ImageUploader";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { transformCloudinaryUrl, uploadToCloudinary } from "../../lib/cloudinary";
import { usePost } from "../../lib/hooks/usePostsQuery";
import { EditorProvider } from "../../utils/EditorContext";

const EditPostContent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthValue() || {};
  const { data: post, isLoading } = usePost(id);
  const { updateDocument, response } = useUpdateDocument("posts");
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      if (post.image) {
        setCoverImage({
          id: "initial",
          file: null,
          preview: post.image,
        });
      }
      setTags(post.tagsArray || []);
    }
  }, [post]);

  const handleTagsChange = (value: string) => {
    const newTags = value
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag && !tags.includes(tag));
    setTags([...tags, ...newTags]);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || tags.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!coverImage) {
      toast({
        title: "Erro",
        description: "Imagem de capa obrigatória.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
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
        title,
        image: imageUrl,
        body: String(post?.body || ""),
        tagsArray: tags,
        uid: user?.uid || post?.uid || "",
        createdBy: post?.createdBy || user?.name || user?.email || "Anonymous",
        likeCount: post?.likeCount || 0,
        likes: post?.likes || [],
      };

      await updateDocument(id!, formData);
      toast({
        title: "Sucesso",
        description: "Post atualizado com sucesso!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar post.";
      toast({
        title: "Erro",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Box>Carregando...</Box>;
  }

  if (!post) {
    return <Box>Post não encontrado</Box>;
  }

  return (
    <VStack spacing={8} maxW="2xl" mx="auto" align="stretch">
      <HStack justify="flex-start">
        <Button as={RouterLink} to="/" variant="ghost" leftIcon={<ArrowBackIcon />} size="sm">
          Voltar
        </Button>
      </HStack>

      <Heading size="lg" fontFamily="heading" color="text.primary">
        Editar post
      </Heading>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
              Título do post
            </FormLabel>
            <Input
              placeholder="Digite o título do seu post"
              size="lg"
              fontFamily="heading"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <ImageUploader
            label="Imagem de capa"
            required
            multiple={false}
            maxFiles={1}
            maxSizeMB={5}
            initialImageUrl={post.image}
            onImagesChange={(images) => {
              setCoverImage(images[0] ?? null);
            }}
          />

          <FormControl>
            <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
              Conteúdo
            </FormLabel>
            <Textarea
              placeholder="Escreva o conteúdo do seu post..."
              minH="300px"
              resize="vertical"
              defaultValue={String(post.body || "")}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
              Tags (separadas por vírgula)
            </FormLabel>
            <Input
              placeholder="react, typescript, firebase"
              onChange={(e) => handleTagsChange(e.target.value)}
              defaultValue={post.tagsArray?.join(", ")}
            />
            {tags.length > 0 && (
              <Box mt={4}>
                <Text fontSize="sm" color="text.muted" mb={2}>
                  Preview das tags:
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} size="md" variant="subtle" colorScheme="gray">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => removeTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
              </Box>
            )}
          </FormControl>

          <HStack justify="flex-end" pt={4}>
            <Button as={RouterLink} to="/" variant="ghost">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="solid"
              isLoading={isSubmitting || response.loading || false}
            >
              Salvar
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
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
