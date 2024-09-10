import { Link } from "react-router-dom";

const NoPostsMessage = () => (
  <div className="flex flex-col justify-center text-center mb-6 ">
    <p className="mb-6">Não foram encontrados posts</p>
    <Link
      to="/posts/create"
      className="bg-[#1a8918] text-white text-center cursor-pointer rounded-lg w-full font-bold border-none py-2.5 px-4 text-base flex justify-center btn-outline  "
    >
      Criar primeiro post
    </Link>
  </div>
);

export { NoPostsMessage };
