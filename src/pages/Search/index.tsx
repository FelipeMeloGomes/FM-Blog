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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold font-heading text-foreground">Resultados</h1>
          <p className="text-muted-foreground">Buscando posts para: "{search}"</p>
        </div>
        <PostListSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold font-heading text-foreground">Resultados</h1>
        <p className="text-muted-foreground">
          {search
            ? `${totalPosts} post${totalPosts > 1 ? "s" : ""} encontrado${totalPosts > 1 ? "s" : ""} para: "${search}"`
            : `${totalPosts} post${totalPosts > 1 ? "s" : ""} encontrado${totalPosts > 1 ? "s" : ""}`}
        </p>
      </div>

      {posts && posts.length > 0 && (
        <>
          <Button asChild variant="ghost" size="sm" className="self-start">
            <Link to="/">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>

          <AdvancedFilters filters={filters} onChange={handleFilterChange} />
        </>
      )}

      {paginatedPosts.length === 0 ? (
        <output
          className="flex flex-col gap-6 py-16 items-center text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="rounded-full bg-muted p-4">
            <FiSearch className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Nenhum resultado encontrado</p>
            <p className="text-sm text-muted-foreground">
              Não encontramos nenhum post
              {search ? ` para "${search}"` : ""}
              {filters.author ? ` por "${filters.author}"` : ""}.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sugestões:</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              <li>Verifique a ortografia das palavras</li>
              <li>Tente usar termos mais genéricos</li>
              <li>Use apenas o título do post</li>
            </ul>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/">Voltar para home</Link>
          </Button>
        </output>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post as never} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pt-4">
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
