import { Post, ShareData } from "./types";

const handleShare = async (post: Post): Promise<void> => {
  const shareData: ShareData = {
    title: post.title,
    text: post.description,
    url: `${window.location.origin}/posts/${post.id}`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  } else {
    const shareUrl = `mailto:?subject=${encodeURIComponent(
      shareData.title,
    )}&body=${encodeURIComponent(shareData.text)}%0A${encodeURIComponent(
      shareData.url,
    )}`;

    window.open(shareUrl, "_blank");
  }
};

export { handleShare };
