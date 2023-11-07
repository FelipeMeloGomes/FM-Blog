// Estilos css
import styles from "./EditPost.module.css";

// React Router Dom
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useEffect, useState } from "react";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue();

    const { updateDocument, response } = useUpdateDocument("posts");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        // validar image url
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

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);

        // redirect to dashboard
        navigate("/dashboard");
    };

    return (
        <div className={styles.container}>
            {post && (
                <>
                    <form
                        className={styles.modal__body}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.input}>
                            <label className={styles.input__label}>
                                <h2>Editando Post: {post.title}</h2>
                            </label>
                        </div>
                        <div className={styles.input}>
                            <label className={styles.input__label}>
                                Título:
                            </label>
                            <input
                                type="text"
                                name="title"
                                alt="Pense num bom titulo"
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
                                alt="Insira uma imagem"
                                required
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                placeholder="Insira uma imagem"
                            />
                            <p className={styles.input__label}>
                                Preview da imagem atual:{" "}
                            </p>
                            <figure>
                                <img
                                    className={styles.image_preview}
                                    src={post.image}
                                    alt={post.title}
                                    width="500px"
                                    height="500px"
                                />
                            </figure>
                        </div>
                        <div className={styles.input}>
                            <label className={styles.input__label}>
                                Conteúdo:
                            </label>
                            <textarea
                                className={`${styles.input__field} ${styles.input__field__textarea}`}
                                placeholder="Insira o conteúdo do post"
                                name="body"
                                required
                                alt="Insira o conteúdo do post"
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
                                alt="Insira as tags separadas por vírgula"
                                required
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </div>
                        <br />
                        {!response.loading && (
                            <button
                                alt="Salvar"
                                className={`${styles.button} ${styles.button__primary}`}
                            >
                                Salvar
                            </button>
                        )}
                        {response.loading && (
                            <button alt="Aguarde" className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && (
                            <p className="error">{response.error}</p>
                        )}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;
