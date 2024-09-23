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
import { Link } from "react-router-dom";
import { LikeButton } from "../LikeButton";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { TagsDisplay } from "../TagsDisplay";
import { PostDetailProps } from "./types";
import { handleShare } from "../../utils/ShareContent";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import { useAuthValue } from "../../context/AuthContext";
import { MdBook } from "react-icons/md";
import { ShareButton } from "../ShareButton";

const PostDetail = ({ post }: PostDetailProps) => {
  const { user } = useAuthValue() || {};
  const { loading } = useFetchDocuments("posts", null);

  if (loading) {
    return;
  }

  const formattedDate = useFormattedDate(post.createdAt);

  return (
    <Card maxW="md" mx="auto" mb="2em" shadow="lg" borderRadius="20px">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar />
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
        loading="eager"
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
