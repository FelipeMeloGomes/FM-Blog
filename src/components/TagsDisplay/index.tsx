import { TagsDisplayProps } from "./types";

const TagsDisplay = ({ tags }: TagsDisplayProps) => {
  return (
    <div className="w-full flex justify-center gap-4 flex-wrap p-2">
      {tags?.map((tag, index) => (
        <p
          key={`${tag}_${index}`}
          className="inline-flex text-base justify-center px-2 py-1 bg-black text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
        >
          {tag}
        </p>
      ))}
    </div>
  );
};

export { TagsDisplay };
