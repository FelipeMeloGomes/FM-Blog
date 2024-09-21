export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

export type Logout = () => Promise<void>;
