import { PostTitleProps } from "./types";

const PostTitle = ({ title }: PostTitleProps) => (
  <div className="flex flex-col mt-7">
    <label className="font-bold text-sm text-center">
      <h2 className="font-bold text-xl">
        <span className="bg-gray-200 font-extrabold mr-2">Editando Post: </span>
        {title}
      </h2>
    </label>
  </div>
);

export { PostTitle };
