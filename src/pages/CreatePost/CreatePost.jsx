// Estilos css
import styles from "./CreatePost.module.css";

// Components
import { LayoutPage } from "./../../components/LayoutPage";
import { TextField } from "./../../components/TextField";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import usePostForm from "../../hooks/usePostForm";
import useFormSubmit from "../../hooks/useFormSubmit";

// Editor text
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
    const {
        titleRef,
        imageRef,
        imageUrl,
        bodyRef,
        tagsRef,
        handleImageUrlChange,
        errorParagraph,
        error,
        navigate,
    } = usePostForm();
    const { user } = useAuthValue();
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

    return (
        <LayoutPage textAlign="center">
            <TextField
                title="Novo Post"
                paragraph="Compartilhe suas ideias!"
            />
            <div className={styles.modal}>
                <form className={styles.modal__body} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label className={styles.input__label}>Título:</label>
                        <input
                            type="text"
                            name="title"
                            alt="Pense num bom título"
                            minLength={6}
                            required
                            className={styles.input__field}
                            placeholder="Pense num bom título"
                            ref={titleRef}
                        />
                    </div>
                    <div className={styles.input}>
                        <label className={styles.input__label}>
                            URL da imagem:
                        </label>
                        <input
                            className={styles.input__field}
                            type="text"
                            name="image"
                            alt="Insira uma imagem"
                            required
                            ref={imageRef}
                            onChange={handleImageUrlChange}
                            placeholder="Insira uma imagem"
                        />
                        <figure className={styles.containerImg}>
                            {imageUrl && !error && (
                                <img
                                    src={imageUrl}
                                    loading="lazy"
                                    alt="Imagem"
                                />
                            )}
                        </figure>
                    </div>
                    <div className={styles.input}>
                        <label className={styles.input__label}>Conteúdo:</label>
                        <ReactQuill
                            className="editor"
                            theme="snow"
                            ref={bodyRef}
                            placeholder="Digite o conteúdo aqui"
                        />
                    </div>
                    <div className={styles.input}>
                        <label className={styles.input__label}>Tags:</label>
                        <input
                            className={styles.input__field}
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
                        <button
                            alt="Cadastrar"
                            className={`${styles.button} ${styles.button__primary}`}
                        >
                            Cadastrar
                        </button>
                    )}
                    {response.error && errorParagraph(response.error)}
                    <br />
                    {formError && errorParagraph(formError)}
                </form>
            </div>
        </LayoutPage>
    );
};

export default CreatePost;
