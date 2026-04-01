import { useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useColorMode } from "../../contexts/ColorModeContext";

interface NavBarMobileProps {
  user: { displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  logout: () => void;
}

const NavBarMobile = ({ user, logout }: NavBarMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const menuItems = [
    { text: "Início", to: "/", show: true },
    { text: "Entrar", to: "/login", show: !user },
    { text: "Cadastrar", to: "/register", show: !user },
    { text: "Novo Post", to: "/posts/create", show: !!user },
    { text: "Meu Perfil", to: "/profile", show: !!user },
    { text: "Meus Posts", to: "/dashboard", show: !!user },
    { text: "Posts Salvos", to: "/saved", show: !!user },
    { text: "Sobre", to: "/about", show: true },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-secondary"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b py-4 px-4">
          <div className="flex flex-col gap-4">
            {menuItems
              .filter((item) => item.show)
              .map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <RouterLink
                    key={item.text}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 px-4 rounded-md font-medium transition-colors ${isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                  >
                    {item.text}
                  </RouterLink>
                );
              })}
            {user && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="py-2 px-4 text-left font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                Sair
              </button>
            )}

            <div className="border-t pt-4">
              <button
                type="button"
                onClick={toggleColorMode}
                className="flex items-center gap-3 py-2 px-4 w-full text-left font-medium text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md transition-colors"
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                <span>{isDark ? "Modo claro" : "Modo escuro"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { NavBarMobile };
