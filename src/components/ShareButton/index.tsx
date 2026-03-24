import { Button } from "@chakra-ui/react";
import { memo } from "react";
import { BiShare } from "react-icons/bi";
import type { ShareButtonProps } from "./types";

const ShareButton = memo(({ post, onShare }: ShareButtonProps) => {
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
});

ShareButton.displayName = "ShareButton";

export { ShareButton };
