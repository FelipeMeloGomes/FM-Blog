import { FiArrowLeft } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-[100vh] py-12 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-500 inline-flex items-center">
          <MdError className="h-6 w-6" />
        </div>
        <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-foreground">
          Página não encontrada
        </h1>
        <p className="mt-4 text-muted-foreground">
          A página que você está procurando não existe. Aqui estão alguns links úteis:
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <FiArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Button>
          </Link>

          <Link to="/">
            <Button className="w-full">Ir para a Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
