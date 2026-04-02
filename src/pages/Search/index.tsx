import { useState } from "react";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { AdvancedFilters } from "../../components/AdvancedFilters";
import type { AdvancedFiltersState } from "../../components/AdvancedFilters/types";
import { Pagination } from "../../components/Pagination";
import { PostCard } from "../../components/PostCard";
import { PostListSkeleton } from "../../components/PostListSkeleton";
import { Button } from "../../components/ui/button";
import { useAdvancedSearch } from "../../hooks/useAdvancedSearch";
import { usePaginatedDocuments } from "../../hooks/usePaginatedDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<AdvancedFiltersState>({
    sortBy: "newest",
    author: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { posts, loading } = usePaginatedDocuments("posts", search, null, 100);

  const { filteredPosts } = useAdvancedSearch(posts as never[], filters);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / 6);
  const startIndex = (currentPage - 1) * 6;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + 6);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }
    setSearchParams(newParams);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters: AdvancedFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
            <span className="text-primary">Resultados</span>
          </h1>
          <p className="text-muted-foreground">Buscando posts para: "{search}"</p>
        </div>
        <PostListSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3 text-center animate-slide-in-from-bottom-4 opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
          <span className="text-primary">Resultados</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {search
            ? `${totalPosts} post${totalPosts > 1 ? "s" : ""} encontrado${totalPosts > 1 ? "s" : ""} para: "${search}"`
            : `${totalPosts} post${totalPosts > 1 ? "s" : ""} encontrado${totalPosts > 1 ? "s" : ""}`}
        </p>
      </header>

      {posts && posts.length > 0 && (
        <div className="animate-slide-in-from-bottom-4 opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <Button asChild variant="ghost" size="sm" className="hover:bg-muted/50 mb-4">
            <Link to="/">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>

          <AdvancedFilters filters={filters} onChange={handleFilterChange} />
        </div>
      )}

      {paginatedPosts.length === 0 ? (
        <output
          className="flex flex-col gap-6 py-16 items-center text-center animate-fade-in"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="rounded-2xl bg-primary/10 p-6">
            <FiSearch className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2 max-w-sm">
            <p className="text-xl font-medium">Nenhum resultado encontrado</p>
            <p className="text-muted-foreground">
              Não encontramos nenhum post
              {search ? ` para "${search}"` : ""}
              {filters.author ? ` por "${filters.author}"` : ""}.
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4 space-y-2 text-left max-w-sm">
            <p className="text-sm font-medium text-foreground">Sugestões:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Verifique a ortografia das palavras
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Tente usar termos mais genéricos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Use apenas o título do post
              </li>
            </ul>
          </div>
          <Button asChild variant="outline" className="rounded-xl mt-2">
            <Link to="/">Voltar para home</Link>
          </Button>
        </output>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-slide-in-from-bottom-4 opacity-0"
                style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: "forwards" }}
              >
                <PostCard post={post as never} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pt-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
