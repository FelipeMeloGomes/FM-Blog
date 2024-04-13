// Estilos css
import styles from "./Search.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// React Router Dom
import { Link } from "react-router-dom";

// Components
import { PostDetail } from "../../components/PostDetail";
import { TextField } from "../../components/TextField";
import { Icon } from "../../components/IconComponent";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFetchDocuments("posts", search);
    return (
        <div className={styles.search_container}>
            <TextField
                title="Procurar"
                paragraph={`Resultados encontrados para: ${search
                    .split(" ")
                    .map(
                        (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                    )
                    .join(" ")}`}
            />

            {posts && posts.length > 0 && (
                <div className={styles.btnArrow}>
                    <Link to="/" className="btn btn-outline">
                        <Icon name="arrow-back" className="icon_font" />
                    </Link>
                </div>
            )}

            <div className={styles.container_found}>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p className={styles.notfoundpost}>
                            Não foram encontrados posts a partir da sua busca...
                        </p>

                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts?.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Search;
