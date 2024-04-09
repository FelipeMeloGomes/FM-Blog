// Estilos css
import styles from "./CreatePost.module.css";

// Components
import LayoutPage from "./../../components/LayoutPage/LayoutPage";
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import useCreatePost from "../../hooks/useCreatePost";

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
        handleSubmit,
        formError,
        handleInputChange,
        errorParagraph,
        error,
    } = useCreatePost();
    const { user } = useAuthValue();
    const { insertDocument, response } = useInsertDocument("posts");

    return (
        <LayoutPage textAlign="center">
            <TitleParagraph
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
                            onChange={handleInputChange}
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
