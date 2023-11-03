// Estilos css
import styles from "./CreatePost.module.css";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useState } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        // valida image url
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        // criar o array de tags
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

        // checar todos os valores
        if (!title || !image || !tags || !body) {
            setFormError("Por Favor, preencha todos os campos!");
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect to home page
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <span className={styles.modal__title}>Novo Post</span>
                </div>
                <form className={styles.modal__body} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label className={styles.input__label}>Título:</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className={styles.input__field}
                            placeholder="Pense num bom título"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
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
                            required
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
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
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                        ></textarea>
                    </div>
                    <div className={styles.input}>
                        <label className={styles.input__label}>Tags:</label>
                        <input
                            className={styles.input__field}
                            type="text"
                            name="tags"
                            placeholder="Insira as tags separadas por vírgula"
                            required
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                        />
                    </div>
                    <br />
                    {!response.loading && (
                        <button
                            className={`${styles.button} ${styles.button__primary}`}
                        >
                            Cadastrar
                        </button>
                    )}
                    {response.loading && (
                        <button className="btn" disabled>
                            Aguarde...
                        </button>
                    )}
                    {response.error && (
                        <p className="error">{response.error}</p>
                    )}
                    {formError && <p className="error">{formError}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
