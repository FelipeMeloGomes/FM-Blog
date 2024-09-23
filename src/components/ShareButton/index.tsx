import { Button } from "@chakra-ui/react";
import { BiShare } from "react-icons/bi";
import { ShareButtonProps } from "./types";

const ShareButton = ({ post, onShare }: ShareButtonProps) => {
  return (
    <Button
      onClick={() => onShare(post)}
      leftIcon={<BiShare />}
      variant="outline"
      colorScheme="black"
      width={{ base: "full", md: "auto" }}
    >
      Compartilhar
    </Button>
  );
};

export { ShareButton };
