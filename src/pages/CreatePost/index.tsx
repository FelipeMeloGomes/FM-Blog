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
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { type ImageFile, ImageUploader } from "../../components/ImageUploader";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { transformCloudinaryUrl, uploadToCloudinary } from "../../lib/cloudinary";
import { EditorProvider } from "../../utils/EditorContext";

const CreatePostContent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuthValue() || {};
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { insertDocument, response } = useInsertDocument("posts");

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

    if (!title || !coverImage?.file || tags.length === 0 || body.length < 10) {
      toast({
        title: "Erro",
        description:
          "Preencha todos os campos obrigatórios. O conteúdo deve ter pelo menos 10 caracteres.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedUrl = await uploadToCloudinary(coverImage.file);
      const imageUrl = transformCloudinaryUrl(uploadedUrl);

      const formData = {
        title,
        image: imageUrl,
        body,
        tagsArray: tags,
        uid: user?.uid || "",
        createdBy: user?.name || user?.email || "Anonymous",
        likeCount: 0,
        likes: [],
      };

      await insertDocument(formData);
      toast({
        title: "Sucesso",
        description: "Post criado com sucesso!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao criar post.";
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

  return (
    <VStack spacing={8} maxW="2xl" mx="auto" align="stretch">
      <HStack justify="flex-start">
        <Button as={RouterLink} to="/" variant="ghost" leftIcon={<ArrowBackIcon />} size="sm">
          Voltar
        </Button>
      </HStack>

      <Heading size="lg" fontFamily="heading" color="gray.900">
        Novo post
      </Heading>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
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
            onImagesChange={(images) => setCoverImage(images[0] ?? null)}
          />

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              Conteúdo
            </FormLabel>
            <Textarea
              placeholder="Escreva o conteúdo do seu post..."
              minH="300px"
              resize="vertical"
              value={body}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              Tags (separadas por vírgula)
            </FormLabel>
            <Input
              placeholder="react, typescript, firebase"
              onChange={(e) => handleTagsChange(e.target.value)}
            />
            {tags.length > 0 && (
              <Box mt={4}>
                <Text fontSize="sm" color="gray.500" mb={2}>
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
              Publicar
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
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
