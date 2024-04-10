// Estilos css
import styles from "./Home.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useState, useEffect } from "react";

// React Router Dom
import { useNavigate, Link } from "react-router-dom";

// Components
import { PostDetail } from "../../components/PostDetail";
import { Spinner } from "../../components/Spinner";
import { TitleParagraph } from "./../../components/TitleParagraph";
import { Icon } from "../../components/IconComponent";

// utils
import { sortPostsByTitle } from "./../../utils/sortPostsByTitle";

const Home = () => {
    const { documents: posts, loading } = useFetchDocuments("posts");
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [sortedPosts, setSortedPosts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    useEffect(() => {
        if (posts) {
            const sorted = sortPostsByTitle(posts);
            setSortedPosts(sorted);
        }
    }, [posts]);

    if (loading || sortedPosts.length === 0) {
        return <Spinner />;
    }

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
                    <Icon name="search" className="icon_font" />
                </button>
            </form>
            <div className="post-list">
                {sortedPosts?.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to="/posts/create" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
                {sortedPosts?.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Home;
