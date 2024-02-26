// Estilos css
import styles from "./EditPost.module.css";

// React Router Dom
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useEffect, useRef, useState } from "react";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const titleRef = useRef("");
    const imageRef = useRef("");
    const bodyRef = useRef("");
    const tagsRef = useRef("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            titleRef.current.value = post.title;
            bodyRef.current.value = post.body;
            imageRef.current.value = post.image;
            const textTags = post.tagsArray.join(", ");
            tagsRef.current.value = textTags;
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
            new URL(imageRef.current.value);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
            return;
        }

        // criar o array de tags
        const tagsArray = tagsRef.current.value
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag);

        // checar todos os valores
        if (
            !titleRef.current.value ||
            !imageRef.current.value ||
            !tagsRef.current.value ||
            !bodyRef.current.value
        ) {
            setFormError("Por Favor, preencha todos os campos!");
            return;
        }

        const data = {
            title: titleRef.current.value,
            image: imageRef.current.value,
            body: bodyRef.current.value,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);

        // Limpa os campos após o envio
        titleRef.current.value = "";
        imageRef.current.value = "";
        bodyRef.current.value = "";
        tagsRef.current.value = "";

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
                                minLength={6}
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
                            <label className={styles.input__label}>
                                <br />
                                Preview da imagem atual:{" "}
                            </label>
                            <figure>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    width="500px"
                                    height="500px"
                                    loading="lazy"
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
                                ref={bodyRef}
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
                                ref={tagsRef}
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
