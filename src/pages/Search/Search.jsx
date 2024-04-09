// Estilos css
import styles from "./Search.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// Icons
import { MdArrowBack } from "react-icons/md";

// React Router Dom
import { Link } from "react-router-dom";

// Components
import { PostDetail } from "../../components/PostDetail";
import { TitleParagraph } from "./../../components/TitleParagraph";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFetchDocuments("posts", search);
    return (
        <div className={styles.search_container}>
            <TitleParagraph
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
                        <MdArrowBack className="icon_font" />
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
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
};

export default Search;
