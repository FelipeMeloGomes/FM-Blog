// Estilos css
import styles from "./EditPost.module.css";

// React Router Dom
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useEffect, useRef, useState } from "react";

// editor text
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Utils
import useFormSubmit from "../../utils/useFormSubmit";

const EditPost = () => {
    const { user } = useAuthValue();
    const { id } = useParams();
    const navigate = useNavigate();
    const titleRef = useRef("");
    const imageRef = useRef("");
    const bodyRef = useRef("");
    const tagsRef = useRef("");
    const { document: post } = useFetchDocument("posts", id);
    const { updateDocument, response } = useUpdateDocument("posts");

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (post) {
            titleRef.current.value = post.title;
            bodyRef.current.value = post.body;
            imageRef.current.value = post.image;
            const textTags = post.tagsArray.join(", ");
            tagsRef.current.value = textTags;
        }
    }, [post, titleRef, bodyRef, imageRef, tagsRef]);

    const handleInputChange = (e) => {
        const newTitle = e.target.value;
        setTimeout(() => {
            setTitle(newTitle);
        }, 250);
    };

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
                                <h2>
                                    <span>Editando Post: </span>
                                    {title || post.title}
                                </h2>
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
                                onChange={handleInputChange}
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
                            <ReactQuill
                                className="editor"
                                ref={bodyRef}
                                theme="snow"
                                placeholder="Digite o conteúdo aqui"
                            />
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
