import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useAuthentication } from "./useAuthentication";

interface CustomUser extends FirebaseUser {
  id: string;
  name: string;
  email: string;
}

export const useAuthState = (): CustomUser | null => {
  const { auth } = useAuthentication();
  const [user, setUser] = useState<CustomUser | null>(null);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const customUser: CustomUser = {
          ...currentUser,
          id: currentUser.uid,
          name: currentUser.displayName || "Nome não disponível",
          email: currentUser.email ?? "",
        };
        setUser(customUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
};
