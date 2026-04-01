import { useState } from "react";
import { FiBookmark, FiFileText, FiInfo, FiLogOut, FiUser } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarMenuProps {
  user?: { displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  logout: () => void;
}

const AvatarMenu = ({ logout, user }: AvatarMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <Avatar size="sm">
          <AvatarImage src={user?.photoURL || undefined} />
          <AvatarFallback>
            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Fechar menu"
          />
          <div className="absolute right-0 mt-2 w-48 bg-card rounded-md border shadow-lg z-50">
            <div className="py-1">
              <RouterLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                <FiUser size={16} />
                Meu Perfil
              </RouterLink>
              <RouterLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                <FiFileText size={16} />
                Meus Posts
              </RouterLink>
              <RouterLink
                to="/saved"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                <FiBookmark size={16} />
                Posts Salvos
              </RouterLink>
              <RouterLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                <FiInfo size={16} />
                Sobre
              </RouterLink>
              <hr className="my-1" />
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <FiLogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { AvatarMenu };
