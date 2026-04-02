import { FiArrowLeft } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-[100vh] py-12 flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md animate-fade-in">
        <div className="relative">
          <div className="p-6 bg-primary/10 rounded-2xl text-primary mb-6">
            <MdError className="h-12 w-12" />
          </div>
          <span className="absolute -top-2 -right-2 text-6xl font-bold text-primary/20 select-none">
            404
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground">
          Página não <span className="text-primary">encontrada</span>
        </h1>

        <p className="mt-4 text-muted-foreground text-lg max-w-sm">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full rounded-xl gap-2">
              <FiArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full rounded-xl">Ir para Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
