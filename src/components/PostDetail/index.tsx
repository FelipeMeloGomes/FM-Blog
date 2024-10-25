import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdBook } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import { handleShare } from "../../utils/ShareContent";
import { LikeButton } from "../LikeButton";
import { ShareButton } from "../ShareButton";
import { TagsDisplay } from "../TagsDisplay";
import { PostDetailProps } from "./types";

const PostDetail = ({ post }: PostDetailProps) => {
  const { user } = useAuthValue() || {};
  const { loading } = useFetchDocuments("posts");

  if (loading) {
    return;
  }

  const formattedDate = useFormattedDate(post.createdAt);

  return (
    <Card
      maxW="md"
      mx="auto"
      mb="2em"
      shadow="md"
      borderRadius="lg"
      borderColor="gray.200"
      borderWidth={1}
    >
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={post.createdBy} />
            <Box textAlign="left">
              <Heading size="sm">{post.createdBy}</Heading>
              <Text>Author, {post.createdBy}</Text>
              <Text>Data, {formattedDate}</Text>
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
        loading="lazy"
        rel="preload"
      />

      <CardBody>
        <Text mb={4}>{post.description}</Text>

        <TagsDisplay tags={post.tagsArray} />
      </CardBody>

      <CardFooter p={4} flexDirection="column" gap={2}>
        <Flex
          gap={4}
          mt={8}
          align="center"
          justify={{ base: "center", md: "space-between" }}
          wrap="wrap"
        >
          <Button
            as={Link}
            to={`/posts/${post.id}`}
            flex="1"
            maxWidth="full"
            variant="outline"
            colorScheme="black"
            leftIcon={<MdBook />}
          >
            Ler
          </Button>
          <ShareButton post={post} onShare={handleShare} />
          <LikeButton postId={post.id} userId={user?.uid} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export { PostDetail };
