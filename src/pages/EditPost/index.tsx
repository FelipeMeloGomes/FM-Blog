import { useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useEffect } from "react";
import { usePostForm } from "../../hooks/usePostForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { EditorContext } from "../../utils/EditorContext";
import { Editor } from "../../components/Editor";
import { Spinner } from "../../components/Spinner";
import { PostTitle } from "../../components/PostTitle";
import { TextInput } from "../../components/TextInput";
import { ImagePreview } from "../../components/ImagePreview";
import { TagsInput } from "../../components/TagsInput";
import { FormButtons } from "../../components/FormButtons";
import { Box, FormLabel } from "@chakra-ui/react";

const EditPost = () => {
  const { user } = useAuthValue() || {};
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts");
  const { handleEditorChange, content, setContent } = EditorContext();
  const {
    bodyRef,
    handleChange,
    imageRef,
    navigate,
    tagsRef,
    title,
    titleRef,
  } = usePostForm();
  const { handleSubmit, formError } = useFormSubmit({
    updateDocument,
    navigate,
    titleRef,
    imageRef,
    bodyRef,
    tagsRef,
    user,
    actionType: "edit",
    postId: id,
  });

  useEffect(() => {
    if (post && bodyRef.current) {
      titleRef.current.value = post.title;
      setContent(post.body);
      imageRef.current.value = post.image;
      const textTags = post.tagsArray.join(", ");
      tagsRef.current.value = textTags;
    }
  }, [post, titleRef, bodyRef, imageRef, tagsRef]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={6}
      mx="auto"
      w="full"
      maxW="4xl"
    >
      {post && (
        <>
          <Box as="form" p={4} onSubmit={handleSubmit}>
            <PostTitle title={title || post.title} />
            <TextInput
              label="Título:"
              name="title"
              placeholder="Pense num bom título"
              ref={titleRef}
              onChange={handleChange}
            />
            <TextInput
              label="URL da imagem:"
              name="image"
              placeholder="Insira uma imagem"
              ref={imageRef}
            />
            <ImagePreview image={post.image} alt={post.title} />
            <Box display="flex" flexDirection="column" mt={7}>
              <FormLabel fontWeight="bold" fontSize="sm">
                Conteúdo:
              </FormLabel>
              <Editor
                onChange={handleEditorChange}
                value={content}
                ref={bodyRef}
              />
            </Box>
            <TagsInput
              placeholder="Insira as tags separadas por vírgula"
              ref={tagsRef}
            />
            <FormButtons response={response} formError={formError} />
          </Box>
        </>
      )}
    </Box>
  );
};

export { EditPost };
