import { useParams, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Spinner } from "../../components/Spinner";
import { LikeButton } from "../../components/LikeButton";
import { Icon } from "../../components/IconComponent";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { TagsDisplay } from "../../components/TagsDisplay";
import {
  Box,
  Flex,
  Stack,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { ShareContent } from "../../utils/ShareContent";
import { BiShare } from "react-icons/bi";

const Post = () => {
  const { user } = useAuthValue() || {};
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument<Post>("posts", id);
  const uid = user?.uid;
  const { documents: posts } = useFetchDocuments<Post>("posts", null, uid);

  const handleNotLoggedIn = () => {
    toast.error(
      "Você precisa estar logado para curtir este post. Por favor, faça o login ou registre-se para participar.",
    );
  };

  const handleShare = () => {
    ShareContent({
      title: post.title,
      text: post.description,
      url: window.location.href,
    });
  };

  return (
    <Box
      maxW="800px"
      w="full"
      p={6}
      mx="auto"
      my={10}
      borderRadius="2xl"
      shadow="lg"
      bg="white"
    >
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner />
        </Flex>
      ) : (
        post && (
          <Stack spacing={8}>
            <Box mb={2} overflow="hidden">
              <Image
                src={post.image}
                alt={post.title}
                objectFit="contain"
                w="full"
                loading="lazy"
              />
              <Text
                fontStyle="italic"
                textAlign="center"
                color="gray.600"
                fontSize="sm"
                my={6}
              >
                Por: {post.createdBy}
              </Text>
            </Box>
            <Box overflow="auto">
              <Heading as="h1" size="2xl" mb={6}>
                {post.title}
              </Heading>
              <Box
                textAlign="left"
                mt={4}
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </Box>
            <Box mt={8}>
              <Heading as="h3" size="lg" mb={6}>
                Este post trata sobre:
              </Heading>
              <TagsDisplay tags={post.tagsArray} />
            </Box>
            <Flex
              gap={4}
              mt={8}
              align="center"
              justify={{ base: "center", md: "space-between" }}
              wrap="wrap"
            >
              <Button
                as={Link}
                to="/"
                leftIcon={<Icon name="ArrowBack" />}
                variant="outline"
                colorScheme="black"
                width={{ base: "full", md: "auto" }}
              >
                Voltar
              </Button>
              <Button
                onClick={handleShare}
                leftIcon={<BiShare />}
                variant="outline"
                colorScheme="black"
                width={{ base: "full", md: "auto" }}
              >
                Compartilhar
              </Button>
              <LikeButton
                postId={post.id}
                onNotLoggedIn={handleNotLoggedIn}
                userId={user?.uid}
              />
            </Flex>
          </Stack>
        )
      )}
    </Box>
  );
};

export { Post };
