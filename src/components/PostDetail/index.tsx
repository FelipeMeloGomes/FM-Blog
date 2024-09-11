import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";

import { BiShare } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LikeButton } from "../LikeButton";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { toast } from "react-toastify";
import { TagsDisplay } from "../TagsDisplay";
import { TagsDisplayProps } from "./types";

const PostDetail = ({ post }: TagsDisplayProps) => {
  const { user } = useAuthValue() || {};
  const uid = user?.uid;
  const { documents: posts, loading } = useFetchDocuments<Post>(
    "posts",
    null,
    uid,
  );

  const handleNotLoggedIn = () => {
    toast.error(
      "Você precisa estar logado para curtir este post. Por favor, faça o login ou registre-se para participar.",
    );
  };

  if (loading) {
    return;
  }

  return (
    <Card maxW="md" mx="auto" mb="2em" shadow="lg" borderRadius="20px">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar />

            <Box textAlign="left">
              <Heading size="sm">{post.createdBy}</Heading>
              <Text>Author, {post.createdBy}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text textAlign="left">{post.title}</Text>
      </CardBody>

      <Image
        objectFit="cover"
        src={post.image}
        alt={post.title}
        loading="eager"
      />

      <CardBody>
        <Text mb={4}>{post.description}</Text>

        <TagsDisplay tags={post.tagsArray} />
      </CardBody>

      <CardFooter p={4} flexDirection="column" gap={2}>
        <Flex width="100%" gap={2}>
          <Button
            as={Link}
            to={`/posts/${post.id}`}
            flex="1"
            variant="outline"
            colorScheme="black"
          >
            Ler
          </Button>

          <LikeButton
            postId={post.id}
            onNotLoggedIn={handleNotLoggedIn}
            userId={user?.uid}
          />
        </Flex>

        <Box mt={2} width="100%">
          <Button variant="ghost" leftIcon={<BiShare />} width="100%">
            Compartilhar
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
};

export { PostDetail };
