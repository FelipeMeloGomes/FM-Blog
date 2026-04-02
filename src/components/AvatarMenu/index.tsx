import { useEffect, useRef, useState } from "react";
import { FiBookmark, FiFileText, FiInfo, FiLogOut, FiUser } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarMenuProps {
  user?: { displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  logout: () => void;
}

const AvatarMenu = ({ logout, user }: AvatarMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none transition-transform duration-200 hover:scale-105 rounded-full"
      >
        <Avatar
          size="sm"
          className="ring-2 ring-transparent hover:ring-primary/30 transition-all duration-200"
        >
          <AvatarImage src={user?.photoURL || undefined} />
          <AvatarFallback className="text-xs">
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
          <div className="absolute right-0 mt-3 w-56 py-1.5 bg-card rounded-xl border shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {user?.displayName && (
              <div className="px-4 py-3 border-b border-border/50">
                <p className="text-sm font-medium truncate">{user.displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
            <div className="py-1.5">
              <RouterLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
              >
                <FiUser size={16} className="text-muted-foreground" />
                Meu Perfil
              </RouterLink>
              <RouterLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
              >
                <FiFileText size={16} className="text-muted-foreground" />
                Meus Posts
              </RouterLink>
              <RouterLink
                to="/saved"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
              >
                <FiBookmark size={16} className="text-muted-foreground" />
                Posts Salvos
              </RouterLink>
              <RouterLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
              >
                <FiInfo size={16} className="text-muted-foreground" />
                Sobre
              </RouterLink>
            </div>
            <div className="border-t border-border/50 pt-1.5 pb-1.5">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
