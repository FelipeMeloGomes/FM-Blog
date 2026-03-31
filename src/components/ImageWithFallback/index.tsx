import { useState } from "react";
import { cn } from "../../lib/utils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback = ({
  src,
  alt = "",
  fallbackSrc,
  className,
  ...props
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn(hasError && fallbackSrc && "opacity-50", className)}
      onError={handleError}
      aria-hidden={!alt}
      {...props}
    />
  );
};
