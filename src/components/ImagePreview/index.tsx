import { ImagePreviewProps } from "./types";

const ImagePreview = ({ image, alt }: ImagePreviewProps) => (
  <div className="flex flex-col mt-7">
    <label className="font-bold text-sm mt-2">
      <br />
      Preview da imagem atual:
    </label>
    <figure className="mt-2 flex justify-center">
      <img
        src={image}
        alt={alt}
        className="w-[500px] h-[500px] object-cover"
        loading="lazy"
      />
    </figure>
  </div>
);

export { ImagePreview };
