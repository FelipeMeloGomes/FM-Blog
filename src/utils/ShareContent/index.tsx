import { WebShareProps } from "./types";

export const ShareContent = async ({
  title,
  text,
  url,
}: WebShareProps): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Web Share API não é suportada neste navegador.");
  }
};
