import imageCompression from "browser-image-compression";
import { useCallback, useId, useRef, useState } from "react";
import { Button } from "../ui/button";
import { AddIcon } from "./AddIcon";
import { ArrowUpIcon } from "./ArrowUpIcon";
import { CloseIcon } from "./CloseIcon";

export interface ImageFile {
  id: string;
  file: File | null;
  preview: string;
  isLoading?: boolean;
  isCompressing?: boolean;
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
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onImagesChange?: (images: ImageFile[]) => void;
  initialImageUrl?: string;
  className?: string;
}

const DEFAULT_COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp" as const,
};

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
  minWidth,
  minHeight,
  maxWidth = 4000,
  maxHeight = 4000,
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

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        reject(new Error("Falha ao carregar imagem"));
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const validateFile = useCallback(
    async (file: File): Promise<string | null> => {
      if (!acceptedFormats.includes(file.type)) {
        return `Formato não suportado. Use: ${acceptedFormats.map((f) => f.split("/")[1]?.toUpperCase()).join(", ")}`;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        return `Arquivo muito grande. Máximo: ${maxSizeMB}MB`;
      }

      try {
        const { width, height } = await getImageDimensions(file);

        if (minWidth && width < minWidth) {
          return `Largura mínima: ${minWidth}px (imagem atual: ${width}px)`;
        }

        if (minHeight && height < minHeight) {
          return `Altura mínima: ${minHeight}px (imagem atual: ${height}px)`;
        }

        if (width > maxWidth) {
          return `Largura máxima: ${maxWidth}px (imagem atual: ${width}px)`;
        }

        if (height > maxHeight) {
          return `Altura máxima: ${maxHeight}px (imagem atual: ${height}px)`;
        }
      } catch {
        return "Não foi possível validar as dimensões da imagem";
      }

      return null;
    },
    [acceptedFormats, maxSizeMB, minWidth, minHeight, maxWidth, maxHeight]
  );

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
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
        const validationError = await validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }

        newImages.push({
          id: generateId(),
          file,
          preview: URL.createObjectURL(file),
          isCompressing: true,
        });
      }

      const updatedImages = multiple ? [...images, ...newImages] : newImages;
      setImages(updatedImages);
      onImagesChange?.(updatedImages);

      for (const newImage of newImages) {
        try {
          const compressedFile = await imageCompression(newImage.file!, {
            ...DEFAULT_COMPRESSION_OPTIONS,
            maxSizeMB: maxSizeMB,
          });

          URL.revokeObjectURL(newImage.preview);

          setImages((prev) =>
            prev.map((img) =>
              img.id === newImage.id
                ? {
                    ...img,
                    file: compressedFile,
                    preview: URL.createObjectURL(compressedFile),
                    isCompressing: false,
                  }
                : img
            )
          );
        } catch {
          setImages((prev) =>
            prev.map((img) => (img.id === newImage.id ? { ...img, isCompressing: false } : img))
          );
        }
      }
    },
    [images, multiple, maxFiles, validateFile, onImagesChange, maxSizeMB]
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
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={acceptedFormats.join(",")}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        type="button"
        disabled={disabled}
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          cursor-pointer rounded-lg border-2 border-dashed p-6 transition-all w-full
          ${isDragging ? "border-primary bg-primary/5 scale-[1.01]" : ""}
          ${disabled ? "cursor-not-allowed opacity-60 bg-muted" : "hover:border-primary/50 hover:bg-muted/50"}
          border-input
        `}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`
              flex h-16 w-16 items-center justify-center rounded-full transition-all
              ${isDragging ? "bg-primary/10" : "bg-muted"}
            `}
          >
            <ArrowUpIcon
              className={`h-8 w-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`}
            />
          </div>

          <div className="text-center">
            <p className="text-base font-medium">
              {isDragging ? "Solte as imagens aqui" : "Arraste e solte suas imagens"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">ou clique para selecionar</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {acceptedFormats.map((f) => f.split("/")[1]?.toUpperCase()).join(", ")} - Máx.{" "}
              {maxSizeMB}MB
              {multiple && ` - Até ${maxFiles} arquivos`}
            </p>
          </div>
        </div>
      </button>

      {error && <p className="text-sm text-destructive mt-2">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium">
              {images.length} {images.length === 1 ? "imagem" : "imagens"} selecionada
              {images.length > 1 ? "s" : ""}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-muted-foreground hover:text-destructive px-3 py-1 rounded transition-colors"
            >
              Remover todas
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} onRemove={() => removeImage(image.id)} />
            ))}

            {canAddMore && (
              <Button
                variant="outline"
                className="h-full min-h-[100px] flex-col gap-2 border-dashed"
                onClick={openFileDialog}
              >
                <AddIcon className="h-6 w-6" />
                <span className="text-xs">Adicionar</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface ImageCardProps {
  image: ImageFile;
  onRemove: () => void;
}

function ImageCard({ image, onRemove }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-lg bg-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image.preview}
        alt={image.file?.name || "Imagem"}
        className={`h-full w-full object-cover transition-transform ${isHovered ? "scale-105" : "scale-100"}`}
      />

      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <button
        type="button"
        aria-label="Remover imagem"
        className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80 ${isHovered ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <CloseIcon className="h-3 w-3" />
      </button>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <p className="truncate text-xs text-white">{image.file?.name || "Imagem carregada"}</p>
      </div>
    </div>
  );
}
