import { useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useEffect } from "react";
import { usePostForm } from "../../hooks/usePostForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { EditorContext } from "../../utils/EditorContext";
import { Editor } from "../../components/Editor";
import { ButtonProps } from "./types";
import { Spinner } from "../../components/Spinner";

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

  const Button = ({ alt, children, ...rest }: ButtonProps) => (
    <button
      {...rest}
      className="inline-flex items-center justify-center bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm transition duration-150 ease-in-out hover:bg-black hover:text-white"
      aria-label={alt}
    >
      {children}
    </button>
  );

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
    <div className="flex flex-col items-center justify-center text-center p-6 mx-auto w-full max-w-4xl">
      {post && (
        <>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mt-7">
              <label className="font-bold text-sm text-center">
                <h2 className="font-bold text-xl">
                  <span className="bg-gray-200 font-extrabold mr-2">
                    Editando Post:{" "}
                  </span>
                  {title || post.title}
                </h2>
              </label>
            </div>
            <div className="flex flex-col mt-7">
              <label className="font-bold text-sm">Título:</label>
              <input
                type="text"
                name="title"
                alt="Pense num bom título"
                required
                minLength={6}
                className="border border-gray-300 rounded px-3 py-3 mt-2 transition ease-in-out duration-150 focus:border-black"
                placeholder="Pense num bom título"
                ref={titleRef}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-7">
              <label className="font-bold text-sm">URL da imagem:</label>
              <input
                className="border border-gray-300 rounded px-3 py-3 mt-2 transition ease-in-out duration-150 focus:border-black"
                type="text"
                name="image"
                alt="Insira uma imagem"
                required
                ref={imageRef}
                placeholder="Insira uma imagem"
              />
              <label className="font-bold text-sm mt-2">
                <br />
                Preview da imagem atual:
              </label>
              <figure className="mt-2 flex justify-center">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-[500px] h-[500px] object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="flex flex-col mt-7">
              <label className="font-bold text-sm">Conteúdo:</label>
              <Editor
                onChange={handleEditorChange}
                value={content}
                ref={bodyRef}
              />
            </div>
            <div className="flex flex-col mt-7">
              <label className="font-bold text-sm">Tags:</label>
              <input
                className="border border-gray-300 rounded px-3 py-3 mt-2 transition ease-in-out duration-150 focus:border-black"
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por vírgula"
                alt="Insira as tags separadas por vírgula"
                required
                ref={tagsRef}
              />
            </div>
            <br />
            {!response.loading && (
              <Button
                alt="Salvar"
                className="bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm hover:bg-black hover:text-white"
              >
                Salvar
              </Button>
            )}
            {response.loading && (
              <Button
                alt="Aguarde"
                className="bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm cursor-not-allowed opacity-50"
                disabled
              >
                Aguarde...
              </Button>
            )}
            {response.error && <p className="text-red-500">{response.error}</p>}
            {formError && <p className="text-red-500">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export { EditPost };
