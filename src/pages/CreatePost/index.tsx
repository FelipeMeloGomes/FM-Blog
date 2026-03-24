import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Tag,
  TagLabel,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { type ImageFile, ImageUploader } from "../../components/ImageUploader";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { transformCloudinaryUrl, uploadToCloudinary } from "../../lib/cloudinary";
import { EditorProvider } from "../../utils/EditorContext";

const processTags = (input: string): string[] => {
  return input
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0)
    .filter((tag, index, self) => self.indexOf(tag) === index)
    .slice(0, 10)
    .map((tag) => tag.slice(0, 30));
};

const CreatePostContent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuthValue() || {};
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<ImageFile | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { insertDocument, response } = useInsertDocument("posts");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const tagsInputRef = useRef<HTMLInputElement>(null);

  const hasUnsavedChanges = title.trim() || coverImage || tagsInput.trim() || body.trim();

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
    return processTags(tagsInput);
  }, [tagsInput]);

  const titleLength = title.trim().length;
  const titleError =
    titleLength > 0 && titleLength < 10
      ? "Título deve ter pelo menos 10 caracteres"
      : titleLength > 200
        ? "Título deve ter no máximo 200 caracteres"
        : "";

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      onOpen();
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !coverImage?.file || previewTags.length === 0 || body.length < 10) {
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

    if (titleError) {
      toast({
        title: "Erro",
        description: titleError,
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
        tagsArray: previewTags,
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

      <Heading size="lg" fontFamily="heading" color="text.primary">
        Novo post
      </Heading>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired isInvalid={!!titleError && titleLength > 0}>
            <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
              Título do post
            </FormLabel>
            <Input
              placeholder="Digite o título do seu post"
              size="lg"
              fontFamily="heading"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={220}
            />
            <HStack justify="space-between" mt={1}>
              {titleError && titleLength > 0 ? (
                <Text fontSize="xs" color="red.500">
                  {titleError}
                </Text>
              ) : (
                <Box />
              )}
              <Text fontSize="xs" color={titleLength > 200 ? "red.500" : "text.tertiary"}>
                {titleLength}/200
              </Text>
            </HStack>
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
            <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
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
            <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
              Tags (separadas por vírgula)
            </FormLabel>
            <Input
              ref={tagsInputRef}
              placeholder="react, typescript, firebase"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
            {previewTags.length > 0 && (
              <Box mt={4}>
                <Text fontSize="sm" color="text.muted" mb={2}>
                  Preview das tags:
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {previewTags.map((tag) => (
                    <Tag key={tag} size="md" variant="subtle" colorScheme="gray">
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </Box>
            )}
          </FormControl>

          <HStack justify="flex-end" pt={4}>
            <Button variant="ghost" onClick={handleCancel}>
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

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Sair sem salvar?</AlertDialogHeader>
            <AlertDialogBody>
              Você tem alterações não salvas. Tem certeza que deseja sair?
            </AlertDialogBody>
            <AlertDialogFooter as={HStack} spacing={3}>
              <Button ref={cancelRef} onClick={onClose}>
                Continuar editando
              </Button>
              <Button colorScheme="red" onClick={() => navigate("/")}>
                Sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
