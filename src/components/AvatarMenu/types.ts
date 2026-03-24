export interface AvatarMenuProps {
  logout: () => void;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    uid?: string;
    photoURL?: string | null;
  } | null;
}
