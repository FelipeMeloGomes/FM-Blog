// Estilos css
import styles from "./Home.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useState } from "react";

// React Router Dom
import { useNavigate, Link } from "react-router-dom";

// Icons
import { CiSearch } from "react-icons/ci";

// Components
import PostDetail from "../../components/PostDetail/PostDetail";
import Spinner from "../../components/Spinner/Spinner";
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";

const Home = () => {
    const { documents: posts, loading } = useFetchDocuments("posts");

    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    // order post by title
    const sortedPosts =
        posts && [...posts].sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div className={styles.home}>
            <TitleParagraph
                title="Veja os nossos posts mais recentes"
                padding="1em"
            />
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    alt="Busque por tags"
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                <button className="btn btn-dark" aria-label="Pesquisar">
                    <CiSearch className="icon_font" />
                </button>
            </form>
            <div className="post-list">
                {loading && <Spinner />}
                {sortedPosts && sortedPosts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to="/posts/create" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
                {sortedPosts &&
                    sortedPosts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
