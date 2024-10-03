import { Box, FormLabel, Image } from "@chakra-ui/react";
import { ImagePreviewProps } from "./types";

const ImagePreview = ({ image, alt }: ImagePreviewProps) => (
  <Box mt={7}>
    <FormLabel fontWeight="bold" fontSize="sm" mt={2}>
      Preview da imagem atual:
    </FormLabel>
    <Box mt={2} display="flex" justifyContent="center">
      <Image
        src={image}
        alt={alt}
        objectFit="cover"
        boxSize="full"
        loading="lazy"
        rel="preload"
      />
    </Box>
  </Box>
);

export { ImagePreview };
