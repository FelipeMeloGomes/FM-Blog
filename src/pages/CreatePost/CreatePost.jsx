// Estilos css
import styles from "./CreatePost.module.css";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Components
import LayoutPage from "./../../components/LayoutPage/LayoutPage";
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useRef } from "react";

const CreatePost = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const bodyRef = useRef(null);
    const tagsRef = useRef(null);

    const { user } = useAuthValue();
    const { insertDocument, response } = useInsertDocument("posts");
    const navigate = useNavigate();

    let formError = "";

    const handleSubmit = (e) => {
        e.preventDefault();
        formError = "";

        // valida image url
        try {
            new URL(imageRef.current.value);
        } catch (error) {
            formError = "A imagem precisa ser uma URL.";
            return;
        }

        // criar o array de tags
        const tagsArray = tagsRef.current.value
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

        // checar todos os valores
        if (
            !titleRef.current.value ||
            !imageRef.current.value ||
            !tagsRef.current.value ||
            !bodyRef.current.value
        ) {
            formError = "Por Favor, preencha todos os campos!";
            return;
        }

        // Inserir o documento correto no form
        insertDocument({
            title: titleRef.current.value,
            image: imageRef.current.value,
            body: bodyRef.current.value,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect to home page
        navigate("/");
    };

    const loadingButton = (
        <button alt="Aguarde" className="btn" disabled>
            Aguarde...
        </button>
    );

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
                    {response.loading && loadingButton}
                    {response.error && errorParagraph(response.error)}
                    {formError && errorParagraph(formError)}
                </form>
            </div>
        </LayoutPage>
    );
};

export default CreatePost;
