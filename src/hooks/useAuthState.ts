import { type User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthentication } from "./useAuthentication";

interface CustomUser extends Omit<FirebaseUser, "photoURL"> {
  id: string;
  name: string;
  email: string;
  photoURL?: string | null;
}

export const useAuthState = (): { user: CustomUser | null; loading: boolean } => {
  const { auth } = useAuthentication();
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const customUser: CustomUser = {
          ...currentUser,
          id: currentUser.uid,
          name: currentUser.displayName || "Nome não disponível",
          email: currentUser.email ?? "",
          photoURL: currentUser.photoURL,
        };
        setUser(customUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
};
