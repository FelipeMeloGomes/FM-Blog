import { useLikeButton } from "../../hooks/useLikeButton";
import { LikeButtonProps } from "./types";

const LikeButton = ({ postId, userId, onNotLoggedIn }: LikeButtonProps) => {
  const { likeCount, liked, loading, handleLikeClick } = useLikeButton({
    postId,
    userId,
    onNotLoggedIn,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <button
      className={`w-[140px] h-[40px] flex items-center justify-start border-none rounded-none overflow-hidden shadow-[5px_5px_10px_rgba(0,0,0,0.089)] cursor-pointer bg-transparent transition-all duration-300 ease-in-out ${
        liked ? "bg-red-700" : "bg-gray-200"
      } hover:bg-red-800 active:bg-red-700`}
      onClick={handleLikeClick}
      disabled={!postId}
    >
      <span
        className={`w-[70%] h-full flex items-center justify-center gap-2 transition-all duration-300 ease-in-out ${
          liked ? "bg-red-700" : "bg-red-600"
        }`}
      >
        <svg
          fill={liked ? "red" : "white"}
          viewBox="0 0 512 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-300 ease-in-out ${
            liked ? "scale-125" : "scale-100"
          }`}
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
        </svg>
        <span className="text-white font-semibold">Curtir</span>
      </span>
      <span className="w-[40%] h-full flex items-center justify-center text-red-600 font-semibold bg-white relative">
        {likeCount}
        <div className="absolute -left-1.5 w-2 h-2 bg-white transform rotate-45"></div>
      </span>
    </button>
  );
};

export { LikeButton };
