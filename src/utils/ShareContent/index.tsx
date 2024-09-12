import { Post, ShareData } from "./types";

const handleShare = async (post: Post): Promise<void> => {
  const shareData: ShareData = {
    title: post.title,
    text: post.description,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error(error);
    }
  } else {
    const shareUrl = `mailto:?subject=${encodeURIComponent(
      shareData.title,
    )}&body=${encodeURIComponent(shareData.title)}%0A${encodeURIComponent(
      shareData.url,
    )}`;

    window.open(shareUrl, "_blank");
  }
};

export { handleShare };
