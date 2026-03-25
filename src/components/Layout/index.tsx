import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Outlet />
        </div>
      </main>
      <footer className="py-8 border-t">
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} FM Blog — feito com React + Firebase
        </p>
      </footer>
    </div>
  );
};

export { Layout };
