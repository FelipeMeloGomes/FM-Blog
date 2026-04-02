import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>
      <NavBar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Outlet />
        </div>
      </main>
      <footer className="py-8 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()}{" "}
            <span className="font-heading font-medium text-foreground">FM Blog</span> — feito com
            React + Firebase
          </p>
        </div>
      </footer>
    </div>
  );
};

export { Layout };
