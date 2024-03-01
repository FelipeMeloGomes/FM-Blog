// Estilos css
import styles from "./Search.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// React Router Dom
import { Link } from "react-router-dom";

// Components
import PostDetail from "../../components/PostDetail/PostDetail";
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFetchDocuments("posts", search);
    return (
        <div className={styles.search_container}>
            <TitleParagraph
                title="Procurar"
                paragraph={`Resultados encontrados para: ${search}`}
            />

            <div className={styles.container_found}>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>
                            Não foram encontrados posts a partir da sua busca...
                        </p>

                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
};

export default Search;
