import { LayoutPage } from "../../components/LayoutPage";
import { TextField } from "../../components/TextField";
import { Editor } from "../../components/Editor";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { usePostForm } from "../../hooks/usePostForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { ButtonProps } from "./types";

const CreatePost = () => {
  const {
    titleRef,
    imageRef,
    imageUrl,
    bodyRef,
    tagsRef,
    handleChange,
    errorParagraph,
    error,
    navigate,
  } = usePostForm();
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
  });

  const Button = ({ alt, children, ...rest }: ButtonProps) => (
    <button
      {...rest}
      className=" mx-auto flex items-center justify-center bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm cursor-pointer hover:bg-black hover:text-white transition duration-150 ease-in-out"
      aria-label={alt}
    >
      {children}
    </button>
  );

  return (
    <LayoutPage textAlign="center">
      <TextField title="Novo Post" paragraph="Compartilhe suas ideias!" />
      <div className="modal flex flex-col w-[600px] max-w-[90%] bg-white-900 shadow-md rounded-2xl my-6 mx-auto">
        <form className="modal__body p-4" onSubmit={handleSubmit}>
          <div className="input mt-7">
            <label className="input__label font-bold text-sm text-left">
              Título:
            </label>
            <input
              type="text"
              name="title"
              alt="Pense num bom título"
              minLength={6}
              required
              className="w-full input__field block mt-2 border border-gray-300 rounded py-3 px-3 transition duration-150 ease-in-out focus:border-black"
              placeholder="Pense num bom título"
              ref={titleRef}
            />
          </div>

          <div className="input mt-7">
            <label className="input__label font-bold text-sm text-left">
              URL da imagem:
            </label>
            <input
              className="w-full input__field block mt-2 border border-gray-300 rounded py-3 px-3 transition duration-150 ease-in-out focus:border-black"
              type="text"
              name="image"
              alt="Insira uma imagem"
              required
              ref={imageRef}
              onChange={handleChange}
              placeholder="Insira uma imagem"
            />
            <figure className="containerImg mt-4">
              {imageUrl && !error && (
                <img src={imageUrl} loading="lazy" alt="Imagem" />
              )}
            </figure>
          </div>

          <div className="input mt-7">
            <label className="w-full input__label font-bold text-sm text-left">
              Conteúdo:
            </label>
            <Editor ref={bodyRef} />
          </div>

          <div className="input mt-7">
            <label className="w-full input__label font-bold text-sm text-left">
              Tags:
            </label>
            <input
              className=" w-full input__field block mt-2 border border-gray-300 rounded py-3 px-3 transition duration-150 ease-in-out focus:border-black"
              type="text"
              name="tags"
              alt="Insira as tags separadas por vírgula"
              placeholder="Insira as tags separadas por vírgula"
              required
              ref={tagsRef}
            />
          </div>
          <br />
          {!response.loading && (
            <Button
              alt="Cadastrar"
              className="w-6 mx-auto flex items-center justify-center bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm cursor-pointer hover:bg-black hover:text-white transition duration-150 ease-in-out"
            >
              Cadastrar
            </Button>
          )}

          {response.error && errorParagraph(response.error)}
          <br />
          {formError && errorParagraph(formError)}
        </form>
      </div>
    </LayoutPage>
  );
};

export { CreatePost };
