import { Box, FormLabel, Image, Input } from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { Editor } from "../../components/Editor";
import { ErrorMessage } from "../../components/ErrorMessage";
import { LayoutPage } from "../../components/LayoutPage";
import { PostDetailProps } from "../../components/PostDetail/types";
import { TextField } from "../../components/TextField";
import { useAuthValue } from "../../context/AuthContext";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { usePostForm } from "../../hooks/usePostForm";

const CreatePost = ({ post }: PostDetailProps) => {
  const existingLikes = post ? post.likes : [];
  const {
    titleRef,
    imageRef,
    imageUrl,
    bodyRef,
    tagsRef,
    handleChange,
    error,
    navigate,
  } = usePostForm({ existingLikes });
  const { user } = useAuthValue() || {};
  const { insertDocument, response } = useInsertDocument("posts");
  const { handleSubmit, formError } = useFormSubmit({
    insertDocument,
    navigate,
    titleRef,
    imageRef,
    bodyRef,
    tagsRef,
    user,
    actionType: "create",
    existingLikes: [],
  });

  return (
    <LayoutPage textAlign="center">
      <TextField title="Novo Post" paragraph="Compartilhe suas ideias!" />
      <Box
        className="modal"
        display="flex"
        flexDirection="column"
        w="600px"
        maxW="90%"
        bg="white"
        boxShadow="md"
        borderRadius="2xl"
        my={6}
        mx="auto"
      >
        <Box as="form" className="modal__body" p={4} onSubmit={handleSubmit}>
          <Box className="input" mt={7}>
            <FormLabel
              className="input__label"
              fontWeight="bold"
              fontSize="sm"
              textAlign="center"
            >
              Título:
            </FormLabel>
            <Input
              type="text"
              name="title"
              alt="Pense num bom título"
              minLength={6}
              required
              w="full"
              mt={2}
              border="1px"
              borderColor="gray.300"
              rounded="md"
              py={3}
              px={3}
              transition="all 0.15s ease-in-out"
              _focus={{ borderColor: "black" }}
              placeholder="Pense num bom título"
              ref={titleRef}
            />
          </Box>

          <Box className="input" mt={7}>
            <FormLabel
              className="input__label"
              fontWeight="bold"
              fontSize="sm"
              textAlign="center"
            >
              URL da imagem:
            </FormLabel>
            <Input
              className="input__field"
              w="full"
              mt={2}
              border="1px"
              borderColor="gray.300"
              rounded="md"
              py={3}
              px={3}
              transition="all 0.15s ease-in-out"
              _focus={{ borderColor: "black" }}
              type="text"
              name="image"
              alt="Insira uma imagem"
              required
              ref={imageRef}
              onChange={handleChange}
              placeholder="Insira uma imagem"
            />
            <Box className="containerImg" mt={4}>
              {imageUrl && !error && (
                <Image src={imageUrl} loading="lazy" alt="Imagem" />
              )}
            </Box>
          </Box>
          <Box className="input" mt={7}>
            <FormLabel
              w="full"
              className="input__label"
              fontWeight="bold"
              fontSize="sm"
              textAlign="center"
            >
              Conteúdo:
            </FormLabel>
            <Editor ref={bodyRef} />
          </Box>
          <Box className="input" mt={7}>
            <FormLabel
              w="full"
              className="input__label"
              fontWeight="bold"
              fontSize="sm"
              textAlign="center"
            >
              Tags:
            </FormLabel>
            <Input
              w="full"
              className="input__field"
              mt={2}
              borderColor="gray.300"
              borderRadius="md"
              py={3}
              px={3}
              transition="all 0.15s ease-in-out"
              _focus={{ borderColor: "black" }}
              type="text"
              name="tags"
              alt="Insira as tags separadas por vírgula"
              placeholder="Insira as tags separadas por vírgula"
              required
              ref={tagsRef}
            />
          </Box>
          <br />
          {!response.loading && <Button alt="Cadastrar">Cadastrar</Button>}
          {response.error && <ErrorMessage message={response.error} />}
          <br />
          {formError && <ErrorMessage message={formError} />}
        </Box>
      </Box>
    </LayoutPage>
  );
};

export { CreatePost };
