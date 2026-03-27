import { FiArrowLeft } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { PostCard } from "../../components/PostCard";
import { PostListSkeleton } from "../../components/PostListSkeleton";
import { Button } from "../../components/ui/button";
import { usePaginatedDocuments } from "../../hooks/usePaginatedDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const [searchParams, setSearchParams] = useSearchParams();

  const { posts, loading, currentPage, totalPages, goToPage, isLoadingPage } =
    usePaginatedDocuments("posts", search, null, 6);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }
    setSearchParams(newParams);
    goToPage(page);
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
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold font-heading text-foreground">Resultados</h1>
        <p className="text-muted-foreground">
          {posts && posts.length > 0
            ? `${posts.length} post${posts.length > 1 ? "s" : ""} encontrado${posts.length > 1 ? "s" : ""} para: "${search}"`
            : `Buscando posts para: "${search}"`}
        </p>
      </div>

      {posts && posts.length > 0 && (
        <Button asChild variant="ghost" size="sm" className="self-start">
          <Link to="/">
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      )}

      {posts?.length === 0 ? (
        <div className="flex flex-col gap-6 py-16 items-center">
          <p className="text-lg text-muted-foreground">Nenhum post encontrado para "{search}"</p>
          <Button asChild variant="outline" size="sm">
            <Link to="/">Voltar para home</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(
              posts as Array<{
                id: string;
                title: string;
                image: string;
                body?: string;
                createdBy: string;
                tagsArray: string[];
                createdAt?: unknown;
                description?: string;
                likes?: string[];
              }>
            )?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoadingPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
