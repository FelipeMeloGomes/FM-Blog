import { AddIcon } from "@chakra-ui/icons";
import { CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState";
import { Pagination } from "../../components/Pagination";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUserPosts } from "../../lib/hooks/usePostsQuery";

const POSTS_PER_PAGE = 5;

type SortOption = "recent" | "oldest" | "mostLiked" | "titleAsc" | "titleDesc";

const formatDate = (date: unknown): string => {
  if (!date) return "";
  const timestamp = date as { seconds?: number; toDate?: () => Date };
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (date instanceof Date) {
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return "";
};

const calculateReadTime = (body: string | undefined): number => {
  if (!body) return 1;
  const wordsPerMinute = 200;
  const cleanText = body.replace(/<[^>]*>/g, "");
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

interface PostData {
  id: string;
  title: string;
  body: string;
  createdAt?: unknown;
  createdBy: string;
  image: string;
  likes: string[];
  likeCount: number;
  photoURL: string;
  tagsArray: string[];
  uid: string;
}

const Dashboard = ({ createdBy: _createdBy }: { createdBy: string }) => {
  const navigate = useNavigate();
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { data: posts, isLoading } = useUserPosts(uid);
  const { deleteDocument } = useDeleteDocument("posts");

  const [searchQuery, setSearchQuery] = useLocalStorage("dashboard-search", "");
  const [sortBy, setSortBy] = useLocalStorage<SortOption>("dashboard-sort", "recent");
  const [currentPage, setCurrentPage] = useState(1);

  const postsArray = useMemo(() => {
    return (posts || []) as PostData[];
  }, [posts]);

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
          return (b.likes?.length || 0) - (a.likes?.length || 0);
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
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [postTitleToDelete, setPostTitleToDelete] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await deleteDocument(postToDelete);
        window.location.reload();
      } catch (error) {
        console.error("Erro ao deletar post:", error);
      }
    }
    onClose();
    setPostToDelete(null);
    setPostTitleToDelete("");
  };

  const confirmDelete = (postId: string, postTitle: string) => {
    setPostToDelete(postId);
    setPostTitleToDelete(postTitle);
    onOpen();
  };

  if (isLoading) {
    return (
      <VStack spacing={8}>
        <VStack spacing={2} textAlign="center" w="full">
          <Heading size="lg" fontFamily="heading" color="text.primary">
            Meus posts
          </Heading>
        </VStack>
        <VStack spacing={4} w="full">
          {[1, 2, 3].map((i) => (
            <Box key={i} h="80px" w="full" bg="bg.secondary" borderRadius="md" />
          ))}
        </VStack>
      </VStack>
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
    <VStack spacing={8} align="stretch" w="full" overflow="hidden">
      <Stack
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "start", sm: "center" }}
        spacing={4}
        w="full"
      >
        <VStack align="start" spacing={1} minW={0}>
          <Heading size="lg" fontFamily="heading" color="text.primary">
            Meus posts
          </Heading>
          <Text color="text.secondary" fontSize="sm">
            {getCountText()}
          </Text>
        </VStack>
        <Button
          as={RouterLink}
          to="/posts/create"
          leftIcon={<AddIcon />}
          variant="solid"
          size="sm"
          flexShrink={0}
          w={{ base: "full", sm: "auto" }}
        >
          Novo post
        </Button>
      </Stack>

      <Stack direction={{ base: "column", md: "row" }} spacing={3} w="full">
        <InputGroup size="lg" flex={1}>
          <Input
            placeholder="Buscar nos meus posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            bg="bg.primary"
            borderColor="border.default"
            _focus={{ borderColor: "text.primary", boxShadow: "none" }}
          />
          {searchQuery && (
            <InputRightElement>
              <IconButton
                aria-label="Limpar busca"
                icon={<CloseIcon boxSize={3} />}
                variant="ghost"
                size="sm"
                onClick={clearSearch}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          w={{ base: "full", md: "200px" }}
          size="lg"
          bg="bg.primary"
          borderColor="border.default"
          _focus={{ borderColor: "text.primary", boxShadow: "none" }}
        >
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="mostLiked">Mais curtidos</option>
          <option value="titleAsc">Título A → Z</option>
          <option value="titleDesc">Título Z → A</option>
        </Select>
      </Stack>

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
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            {paginatedPosts.map((post) => {
              const readTime = calculateReadTime(post.body);
              const formattedDate = formatDate(post.createdAt);

              return (
                <HStack
                  key={post.id}
                  py={4}
                  px={{ base: 2, md: 3 }}
                  spacing={{ base: 3, md: 4 }}
                  align="center"
                  w="full"
                  overflow="hidden"
                  _hover={{ bg: "bg.secondary" }}
                  transition="background 0.2s"
                  borderRadius="sm"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    boxSize={{ base: "48px", md: "60px" }}
                    minW={{ base: "48px", md: "60px" }}
                    flexShrink={0}
                    borderRadius="sm"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/60x60?text=img"
                  />

                  <VStack align="start" spacing={1} flex={1} minW={0} overflow="hidden">
                    <Text
                      as={RouterLink}
                      to={`/posts/${post.id}`}
                      fontSize="sm"
                      fontWeight="600"
                      color="text.primary"
                      noOfLines={1}
                      w="full"
                      _hover={{ color: "text.secondary" }}
                    >
                      {post.title}
                    </Text>
                    <HStack spacing={2} fontSize="xs" color="text.muted">
                      <Text flexShrink={0}>{formattedDate}</Text>
                      <Text flexShrink={0}>·</Text>
                      <Text flexShrink={0}>{readTime} min</Text>
                    </HStack>
                  </VStack>

                  <HStack spacing={2} flexShrink={0}>
                    <Text fontSize="sm" color="text.secondary" whiteSpace="nowrap">
                      ♥ {post.likes?.length || 0}
                    </Text>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<Text>⋮</Text>}
                        variant="ghost"
                        size="sm"
                        aria-label="Opções do post"
                      />
                      <MenuList>
                        <MenuItem as={RouterLink} to={`/posts/edit/${post.id}`} fontSize="sm">
                          Editar
                        </MenuItem>
                        <MenuItem as={RouterLink} to={`/posts/${post.id}`} fontSize="sm">
                          Ver post
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          fontSize="sm"
                          color="red.500"
                          onClick={() => confirmDelete(post.id, post.title)}
                        >
                          Deletar
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </HStack>
              );
            })}
          </VStack>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent mx={4} maxW={{ base: "calc(100vw - 32px)", md: "md" }}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar post
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text wordBreak="break-word">
                Tem certeza que deseja deletar{" "}
                <Text as="span" fontWeight="600">
                  "{postTitleToDelete}"
                </Text>
                ? Esta ação não pode ser desfeita.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter
              as={Stack}
              direction={{ base: "column-reverse", sm: "row" }}
              spacing={3}
            >
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant="outline"
                w={{ base: "full", sm: "auto" }}
              >
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} w={{ base: "full", sm: "auto" }}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default Dashboard;
