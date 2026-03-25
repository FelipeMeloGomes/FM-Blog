import { Link as RouterLink } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { AvatarMenu } from "../AvatarMenu";
import { ColorModeToggle } from "../ColorModeToggle";
import { NavBarMobile } from "../NavBarMobile";

const NavBar = () => {
  const auth = useAuthValue();
  const user = auth?.user ?? null;
  const { logout } = useAuthentication();

  return (
    <nav className="sticky top-0 bg-background border-b z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink
          to="/"
          className="font-heading text-xl font-bold text-foreground hover:text-muted-foreground transition-colors"
        >
          FM Blog
        </RouterLink>

        <div className="hidden md:flex items-center gap-4">
          <RouterLink
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Início
          </RouterLink>

          {user ? (
            <>
              <RouterLink
                to="/posts/create"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Criar post
              </RouterLink>
              <AvatarMenu user={user} logout={logout} />
              <ColorModeToggle />
            </>
          ) : (
            <>
              <RouterLink
                to="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Entrar
              </RouterLink>
              <RouterLink
                to="/register"
                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Cadastrar
              </RouterLink>
              <ColorModeToggle />
            </>
          )}
        </div>

        <NavBarMobile user={user || null} logout={logout} />
      </div>
    </nav>
  );
};

export { NavBar };
