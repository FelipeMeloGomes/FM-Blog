// Estilos css
import styles from "./Dashboard.module.css";

// React Router Dom
import { Link } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useState, useEffect } from "react";

// components
import { TitleParagraph } from "../../components/TitleParagraph";
import { Spinner } from "../../components/Spinner";

// utils
import { SortPost } from "../../utils/SortPost";

const Dashboard = ({ createdBy }) => {
    const { user } = useAuthValue();
    const uid = user.uid;
    const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
    const { deleteDocument } = useDeleteDocument("posts");
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        if (posts) {
            const sorted = SortPost(posts);
            setSortedPosts(sorted);
        }
    }, [posts]);

    if (loading) {
        return;
    }

    return (
        <div className={styles.dashboard}>
            <TitleParagraph
                title="Dashboard"
                paragraph="Gerencie os seus posts"
            />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {sortedPosts?.length === 0 ? (
                        <div className={styles.noposts}>
                            <p>Não foram encontrados posts</p>
                            <Link to="/posts/create" className="btn">
                                Criar primeiro post
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className={styles.post_header}>
                                <span>Título</span>
                                <span>Ações</span>
                            </div>

                            {sortedPosts?.map((post) => (
                                <div key={post.id} className={styles.post_row}>
                                    <p>{post.title}</p>
                                    <div>
                                        <Link
                                            to={`/posts/${post.id}`}
                                            className="btn btn-outline"
                                        >
                                            Ver
                                        </Link>
                                        <Link
                                            to={`/posts/edit/${post.id}`}
                                            className="btn btn-outline"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                deleteDocument(post.id)
                                            }
                                            className="btn btn-outline btn-danger"
                                            alt="Excluir"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
