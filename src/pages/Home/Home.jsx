// Estilos css
import styles from "./Home.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSearchPost } from "../../hooks/useSearchPost";
import { useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Components
import { PostDetail } from "../../components/PostDetail";
import { Spinner } from "../../components/Spinner";
import { TextField } from "./../../components/TextField";
import { Icon } from "../../components/IconComponent";

// utils
import { SortPost } from "../../utils/SortPost";

const Home = () => {
    const { documents: posts, loading } = useFetchDocuments("posts");
    const { handleSubmit, query, setQuery, sortedPosts, setSortedPosts } =
        useSearchPost();

    useEffect(() => {
        if (posts) {
            const sorted = SortPost(posts);
            setSortedPosts(sorted);
        }
    }, [posts]);

    if (loading || sortedPosts.length === 0) {
        return <Spinner />;
    }

    return (
        <div className={styles.home}>
            <TextField title="Veja os nossos posts mais recentes" />
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
