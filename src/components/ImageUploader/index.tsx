import { AddIcon, ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useCallback, useId, useRef, useState } from "react";

export interface ImageFile {
  id: string;
  file: File | null;
  preview: string;
  isLoading?: boolean;
}

interface ImageUploaderProps {
  name?: string;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  onImagesChange?: (images: ImageFile[]) => void;
  initialImageUrl?: string;
  className?: string;
}

export function ImageUploader({
  name,
  label,
  description,
  required = false,
  disabled = false,
  multiple = true,
  maxFiles = 10,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  onImagesChange,
  initialImageUrl,
  className,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>(() => {
    if (initialImageUrl) {
      return [
        {
          id: "initial",
          file: null,
          preview: initialImageUrl,
        },
      ];
    }
    return [];
  });
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return `Formato não suportado. Use: ${acceptedFormats.map((f) => f.split("/")[1]?.toUpperCase()).join(", ")}`;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        return `Arquivo muito grande. Máximo: ${maxSizeMB}MB`;
      }
      return null;
    },
    [acceptedFormats, maxSizeMB]
  );

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);

      if (!multiple && fileArray.length > 1) {
        setError("Apenas uma imagem permitida");
        return;
      }

      const currentImagesWithoutInitial = images.filter((img) => img.id !== "initial");
      const remainingSlots = multiple ? maxFiles - currentImagesWithoutInitial.length : 1;
      if (fileArray.length > remainingSlots) {
        setError(`Máximo de ${maxFiles} imagens permitido`);
        return;
      }

      const newImages: ImageFile[] = [];

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }

        newImages.push({
          id: generateId(),
          file,
          preview: URL.createObjectURL(file),
        });
      }

      const updatedImages = multiple ? [...images, ...newImages] : newImages;
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
    },
    [images, multiple, maxFiles, validateFile, onImagesChange]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    },
    [disabled, processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [processFiles]
  );

  const removeImage = useCallback(
    (id: string) => {
      const imageToRemove = images.find((img) => img.id === id);
      if (imageToRemove?.file) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      const updatedImages = images.filter((img) => img.id !== id);
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
      setError(null);
    },
    [images, onImagesChange]
  );

  const clearAll = useCallback(() => {
    for (const img of images) {
      if (img.file) {
        URL.revokeObjectURL(img.preview);
      }
    }
    setImages([]);
    onImagesChange?.([]);
    setError(null);
  }, [images, onImagesChange]);

  const openFileDialog = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const currentImages = images.filter((img) => img.id !== "initial");
  const hasInitialImage = images.some((img) => img.id === "initial");
  const canAddMore = multiple
    ? currentImages.length < maxFiles
    : !hasInitialImage && currentImages.length === 0;

  return (
    <FormControl isInvalid={!!error} isDisabled={disabled} className={className}>
      {label && (
        <FormLabel htmlFor={inputId} fontSize="sm" fontWeight="medium" color="gray.700">
          {label}
          {required && (
            <Text as="span" color="red.500" ml={1}>
              *
            </Text>
          )}
        </FormLabel>
      )}
      {description && <FormHelperText color="gray.500">{description}</FormHelperText>}

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={acceptedFormats.join(",")}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <Box
        onClick={disabled ? undefined : openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        cursor={disabled ? "not-allowed" : "pointer"}
        border="2px dashed"
        borderColor={isDragging ? "blue.500" : "gray.300"}
        borderRadius="lg"
        p={6}
        bg={isDragging ? "blue.50" : disabled ? "gray.50" : "white"}
        opacity={disabled ? 0.6 : 1}
        transform={isDragging ? "scale(1.01)" : "scale(1)"}
        transition="all 0.2s"
        _hover={
          !disabled
            ? {
                borderColor: "blue.300",
                bg: "gray.50",
              }
            : undefined
        }
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="64px"
            w="64px"
            borderRadius="full"
            bg={isDragging ? "blue.100" : "gray.100"}
            transition="all 0.2s"
          >
            <Icon
              as={ArrowUpIcon}
              boxSize={8}
              color={isDragging ? "blue.500" : "gray.500"}
              transition="all 0.2s"
            />
          </Box>

          <Box textAlign="center">
            <Text fontSize="base" fontWeight="medium" color="gray.800">
              {isDragging ? "Solte as imagens aqui" : "Arraste e solte suas imagens"}
            </Text>
            <Text mt={1} fontSize="sm" color="gray.500">
              ou clique para selecionar
            </Text>
            <Text mt={2} fontSize="xs" color="gray.500">
              {acceptedFormats.map((f) => f.split("/")[1]?.toUpperCase()).join(", ")} - Máx.{" "}
              {maxSizeMB}MB
              {multiple && ` - Até ${maxFiles} arquivos`}
            </Text>
          </Box>
        </Box>
      </Box>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}

      {images.length > 0 && (
        <Box mt={4}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              {images.length} {images.length === 1 ? "imagem" : "imagens"} selecionada
              {images.length > 1 ? "s" : ""}
            </Text>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              color="gray.500"
              _hover={{ color: "red.500" }}
            >
              Remover todas
            </Button>
          </Box>

          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={3}>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} onRemove={() => removeImage(image.id)} />
            ))}

            {canAddMore && (
              <Button
                variant="outline"
                borderStyle="dashed"
                h="full"
                minH="100px"
                flexDirection="column"
                gap={2}
                onClick={openFileDialog}
                color="gray.500"
                _hover={{ borderColor: "blue.400", bg: "gray.50" }}
              >
                <Icon as={AddIcon} boxSize={6} />
                <Text fontSize="xs">Adicionar</Text>
              </Button>
            )}
          </SimpleGrid>
        </Box>
      )}
    </FormControl>
  );
}

interface ImageCardProps {
  image: ImageFile;
  onRemove: () => void;
}

function ImageCard({ image, onRemove }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position="relative"
      aspectRatio={1}
      overflow="hidden"
      borderRadius="lg"
      bg="gray.100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={image.preview}
        alt={image.file?.name || "Imagem"}
        objectFit="cover"
        w="full"
        h="full"
        transition="transform 0.2s"
        transform={isHovered ? "scale(1.05)" : "scale(1)"}
      />

      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.400"
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.2s"
      />

      <IconButton
        aria-label="Remover imagem"
        icon={<CloseIcon />}
        position="absolute"
        right={2}
        top={2}
        size="sm"
        borderRadius="full"
        bg="blackAlpha.600"
        color="white"
        _hover={{ bg: "blackAlpha.800" }}
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.2s"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        minW="28px"
        height="28px"
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.600, transparent)"
        p={2}
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.2s"
      >
        <Text fontSize="xs" color="white" isTruncated>
          {image.file?.name || "Imagem carregada"}
        </Text>
      </Box>
    </Box>
  );
}
