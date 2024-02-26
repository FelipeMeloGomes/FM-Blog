// Estilos css
import styles from "./CreatePost.module.css";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Components
import LayoutPage from "./../../components/LayoutPage/LayoutPage";
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";

// Utils
import useFormSubmit from "../../utils/useFormSubmit";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useRef } from "react";

const CreatePost = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const bodyRef = useRef(null);
    const tagsRef = useRef(null);
    const navigate = useNavigate();
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

    const errorParagraph = (errorMessage) => (
        <p className="error">{errorMessage}</p>
    );

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
                            placeholder="Insira uma imagem"
                        />
                    </div>
                    <div className={styles.input}>
                        <label className={styles.input__label}>Conteúdo:</label>
                        <textarea
                            className={`${styles.input__field} ${styles.input__field__textarea}`}
                            placeholder="Insira o conteúdo do post"
                            name="body"
                            required
                            alt="Insira o conteúdo do post"
                            ref={bodyRef}
                        ></textarea>
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
