import { TextField } from "../../components/TextField";
import { Link } from "react-router-dom";
import NotFoundImg from "./assets/NotFoundImg.webp";

const NotFound = () => {
  return (
    <div className="w-full max-w-full  p-6 bg-green-500 container">
      <TextField
        color="black"
        title="404"
        paragraph="Página Não Encontrada Desculpe."
      />
      <div className="flex justify-center items-center bg-green-500 center">
        <Link to="/" className="btn btn-outline">
          Home
        </Link>
      </div>
      <div className="mt-8 w-full max-w-[400px] mx-auto mb-8 rounded-lg animate-float containerImg">
        <figure>
          <img
            className="w-full h-auto"
            src={NotFoundImg}
            alt="not found"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  );
};

export { NotFound };
