export interface NavBarProps {
  isOpen?: boolean;
  user: User | null | undefined;
  logout: () => void;
  onToggle?: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
