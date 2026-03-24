import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
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
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { usePostForm } from "../../hooks/usePostForm";
import { EditorProvider } from "../../utils/EditorContext";

const CreatePostContent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuthValue() || {};
  const { titleRef, imageRef, imageUrl, tagsRef, handleChange, error } = usePostForm({
    existingLikes: [],
  });
  const { insertDocument, response } = useInsertDocument("posts");
  const [tags, setTags] = useState<string[]>([]);

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

    const title = titleRef.current?.value;
    const image = imageRef.current?.value;

    if (!title || !image || tags.length === 0) {
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

    const formData = {
      title,
      image,
      body: "",
      tagsArray: tags,
      uid: user?.uid || "",
      createdBy: user?.name || user?.email || "Anonymous",
      likeCount: 0,
      likes: [],
    };

    try {
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
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao criar post.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
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
              ref={titleRef}
              placeholder="Digite o título do seu post"
              size="lg"
              fontFamily="heading"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              URL da imagem de capa
            </FormLabel>
            <Input
              ref={imageRef}
              placeholder="https://exemplo.com/imagem.jpg"
              onChange={handleChange}
            />
            {imageUrl && !error && (
              <Box mt={4}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={imageUrl} alt="Preview" borderRadius="md" objectFit="cover" />
                </AspectRatio>
              </Box>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              Conteúdo
            </FormLabel>
            <Textarea
              placeholder="Escreva o conteúdo do seu post..."
              minH="300px"
              resize="vertical"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              Tags (separadas por vírgula)
            </FormLabel>
            <Input
              ref={tagsRef}
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
            <Button type="submit" variant="solid" isLoading={response.loading || false}>
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
