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
import { Post } from "./types";

const Search: React.FC = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFetchDocuments<Post>("posts", search);
    return (
        <div className={styles.search_container}>
            <TextField
                title="Procurar"
                paragraph={`Resultados encontrados para: ${search}`}
            />

            {posts?.length > 0 && (
                <div className={styles.btnArrow}>
                    <Link to="/" className="btn btn-outline">
                        <Icon name="arrowBack" className="icon_font" />
                    </Link>
                </div>
            )}

            <div className={styles.container_found}>
                {posts?.length === 0 && (
                    <div className={styles.noposts}>
                        <p className={styles.notfoundpost}>
                            Não foram encontrados posts a partir da sua busca...
                        </p>

                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts?.map((post: Post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export { Search };
