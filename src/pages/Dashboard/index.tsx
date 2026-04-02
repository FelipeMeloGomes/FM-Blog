import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiBarChart, FiEdit, FiEye, FiHeart, FiMessageCircle, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState";
import { MetricCard } from "../../components/MetricCard";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Skeleton } from "../../components/ui/skeleton";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useMetrics } from "../../hooks/useMetrics";
import { usePostsViews } from "../../hooks/usePostsViews";
import { useUserPosts } from "../../lib/hooks/usePostsQuery";
import { calculateReadTime, formatDateShort } from "../../utils/date";

interface MenuDropdownProps {
  postId: string;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const MenuDropdown = ({ postId, isOpen, onToggle, onDelete }: MenuDropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.right - 128,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="p-2 hover:bg-secondary rounded-md"
        aria-label="Opções do post"
        onClick={onToggle}
      >
        ⋮
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed bg-card rounded-md border shadow-lg z-50"
            style={{ top: position.top, left: position.left }}
          >
            <a
              href={`/posts/edit/${postId}`}
              className="block px-4 py-2 text-sm hover:bg-secondary"
            >
              Editar
            </a>
            <a href={`/posts/${postId}`} className="block px-4 py-2 text-sm hover:bg-secondary">
              Ver post
            </a>
            <button
              type="button"
              onClick={onDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary"
            >
              Deletar
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

const POSTS_PER_PAGE = 5;

type SortOption = "recent" | "oldest" | "mostLiked" | "titleAsc" | "titleDesc";

interface PostData {
  id: string;
  title: string;
  body: string;
  createdAt?: unknown;
  createdBy: string;
  image: string;
  likes?: string[];
  likeCount?: number;
  photoURL: string;
  tagsArray: string[];
  uid: string;
  views?: number;
}

const Dashboard = ({ createdBy: _createdBy }: { createdBy: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { data: posts, isLoading } = useUserPosts(uid, 100);
  const { metrics, loading: metricsLoading } = useMetrics(uid);
  const { deleteDocument } = useDeleteDocument("posts");

  const [searchQuery, setSearchQuery] = useLocalStorage("dashboard-search", "");
  const [sortBy, setSortBy] = useLocalStorage<SortOption>("dashboard-sort", "recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [postTitleToDelete, setPostTitleToDelete] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);

  const postsArray = useMemo(() => {
    return (posts || []) as PostData[];
  }, [posts]);

  const postIds = useMemo(() => postsArray.map((p) => p.id), [postsArray]);
  const { viewsMap } = usePostsViews(postIds);

  const filteredPosts = useMemo(() => {
    let result = [...postsArray];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const tagsMatch = post.tagsArray?.some((tag) => tag.toLowerCase().includes(query));
        return titleMatch || tagsMatch;
      });
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "recent": {
          const dateA = a.createdAt ? (a.createdAt as { seconds?: number }).seconds || 0 : 0;
          const dateB = b.createdAt ? (b.createdAt as { seconds?: number }).seconds || 0 : 0;
          return dateB - dateA;
        }
        case "oldest": {
          const dateAOld = a.createdAt ? (a.createdAt as { seconds?: number }).seconds || 0 : 0;
          const dateBOld = b.createdAt ? (b.createdAt as { seconds?: number }).seconds || 0 : 0;
          return dateAOld - dateBOld;
        }
        case "mostLiked":
          return (b.likeCount || 0) - (a.likeCount || 0);
        case "titleAsc":
          return a.title.localeCompare(b.title);
        case "titleDesc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [postsArray, searchQuery, sortBy]);

  const totalFilteredPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalFilteredPosts / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (postId: string, postTitle: string) => {
    setPostToDelete(postId);
    setPostTitleToDelete(postTitle);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedIds.size > 0) {
        await Promise.all([...selectedIds].map((id) => deleteDocument(id)));
      } else if (postToDelete) {
        await deleteDocument(postToDelete);
      }

      queryClient.invalidateQueries({ queryKey: ["posts", "user", uid] });
    } catch (error) {
      console.error("Erro ao deletar post(s):", error);
    }

    setIsOpen(false);
    setPostToDelete(null);
    setPostTitleToDelete("");
    setSelectedIds(new Set());
    setIsSelectMode(false);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
  };

  const toggleSelect = (postId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedPosts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedPosts.map((p) => p.id)));
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 border rounded-md">
              <Skeleton className="h-12 w-12 rounded-sm" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalPosts = postsArray.length;

  const getCountText = () => {
    if (searchQuery.trim()) {
      return `${totalFilteredPosts} de ${totalPosts} posts`;
    }
    return `${totalPosts} ${totalPosts === 1 ? "post publicado" : "posts publicados"}`;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {metrics && !metricsLoading && (
        <div className="flex flex-col sm:flex-row gap-4">
          <MetricCard title="Posts" value={metrics.totalPosts} icon={FiBarChart} />
          <MetricCard title="Visualizações" value={metrics.totalViews} icon={FiEye} />
          <MetricCard title="Curtidas" value={metrics.totalLikes} icon={FiHeart} />
          <MetricCard title="Comentários" value={metrics.totalComments} icon={FiMessageCircle} />
        </div>
      )}

      {metricsLoading && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-[100px] flex-1" />
          <Skeleton className="h-[100px] flex-1" />
          <Skeleton className="h-[100px] flex-1" />
          <Skeleton className="h-[100px] flex-1" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div className="flex flex-col gap-1 min-w-0">
          <h1 className="text-2xl font-bold font-heading text-foreground">Meus posts</h1>
          <p className="text-sm text-muted-foreground">{getCountText()}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {isSelectMode && (
            <Button
              onClick={toggleSelectMode}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial"
            >
              Cancelar
            </Button>
          )}
          {!isSelectMode && (
            <Button
              onClick={toggleSelectMode}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              Selecionar
            </Button>
          )}
          <Button
            onClick={() => navigate("/posts/create")}
            size="sm"
            className="flex-1 sm:flex-initial"
          >
            <FiEdit className="mr-2 h-4 w-4" />
            Novo post
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar nos meus posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          )}
        </div>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm w-full md:w-[200px]"
        >
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="mostLiked">Mais curtidos</option>
          <option value="titleAsc">Título A → Z</option>
          <option value="titleDesc">Título Z → A</option>
        </select>
      </div>

      {totalPosts === 0 ? (
        <EmptyState
          icon={<FiEdit />}
          title="Você ainda não publicou nada"
          description="Seus posts aparecerão aqui depois que você publicar."
          action={{ label: "Escrever primeiro post", onClick: () => navigate("/posts/create") }}
        />
      ) : totalFilteredPosts === 0 ? (
        <EmptyState
          icon={<FiEdit />}
          title="Nenhum resultado encontrado"
          description={`Não encontramos posts para "${searchQuery}".`}
          action={searchQuery ? { label: "Limpar busca", onClick: clearSearch } : undefined}
        />
      ) : (
        <>
          {isSelectMode && (
            <div className="flex items-center gap-4 py-3 px-2 md:px-3 bg-secondary/50 rounded-md">
              <Checkbox
                checked={selectedIds.size === paginatedPosts.length && paginatedPosts.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm text-muted-foreground">
                {selectedIds.size} post{selectedIds.size !== 1 ? "s" : ""} selecionado
                {selectedIds.size !== 1 ? "s" : ""}
              </span>
              <Button
                onClick={() => setIsOpen(true)}
                size="sm"
                variant="destructive"
                disabled={selectedIds.size === 0}
                className="ml-auto"
              >
                <FiTrash className="mr-2 h-4 w-4" />
                Deletar selecionados
              </Button>
            </div>
          )}

          <div className="flex flex-col w-full">
            {paginatedPosts.map((post) => {
              const readTime = calculateReadTime(post.body);
              const formattedDate = formatDateShort(post.createdAt);
              const isSelected = selectedIds.has(post.id);

              return (
                <div
                  key={post.id}
                  onClick={() => isSelectMode && toggleSelect(post.id)}
                  onKeyDown={(e) =>
                    isSelectMode && (e.key === "Enter" || e.key === " ") && toggleSelect(post.id)
                  }
                  aria-selected={isSelectMode ? isSelected : undefined}
                  tabIndex={isSelectMode ? 0 : -1}
                  className={`flex items-center gap-3 md:gap-4 py-4 px-2 md:px-3 w-full overflow-hidden hover:bg-secondary rounded-sm transition-colors ${
                    isSelected ? "bg-blue-50 dark:bg-blue-950/30" : ""
                  } ${isSelectMode ? "cursor-pointer" : ""}`}
                >
                  {isSelectMode && (
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(post.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}

                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-12 h-12 md:w-14 md:min-w-[60px] flex-shrink-0 rounded-sm object-cover"
                    loading="lazy"
                  />

                  <div className="flex flex-col gap-1 flex-1 min-w-0 overflow-hidden">
                    <a
                      href={`/posts/${post.id}`}
                      className="text-sm font-semibold text-foreground hover:text-muted-foreground truncate block w-full"
                      onClick={(e) => isSelectMode && e.preventDefault()}
                    >
                      {post.title}
                    </a>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span className="flex-shrink-0">{formattedDate}</span>
                      <span className="flex-shrink-0">·</span>
                      <span className="flex-shrink-0">{readTime} min</span>
                    </div>
                  </div>

                  {!isSelectMode && (
                    <div className="flex gap-2 flex-shrink-0 items-center">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        👁 {viewsMap[post.id] || 0}
                      </span>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        ♥ {post.likeCount || 0}
                      </span>
                      <MenuDropdown
                        postId={post.id}
                        isOpen={openMenuId === post.id}
                        onToggle={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                        onDelete={() => confirmDelete(post.id, post.title)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg p-6 max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-2">
              {selectedIds.size > 0 ? "Deletar posts" : "Deletar post"}
            </h2>
            <p className="text-muted-foreground mb-4 break-words">
              {selectedIds.size > 0 ? (
                <>
                  Tem certeza que deseja deletar{" "}
                  <span className="font-semibold">{selectedIds.size} posts</span>? Esta ação não
                  pode ser desfeita.
                </>
              ) : (
                <>
                  Tem certeza que deseja deletar{" "}
                  <span className="font-semibold">"{postTitleToDelete}"</span>? Esta ação não pode
                  ser desfeita.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
                Cancelar
              </Button>
              <Button onClick={handleDelete} className="w-full bg-red-500 hover:bg-red-600">
                Deletar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
