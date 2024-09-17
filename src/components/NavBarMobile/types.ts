export interface NavBarProps {
  isOpen: boolean;
  user: User | null;
  logout: () => void;
  onToggle: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
