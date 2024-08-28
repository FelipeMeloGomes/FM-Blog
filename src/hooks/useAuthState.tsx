import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./useAuthentication";

export const useAuthState = (): User | null => {
  const { auth } = useAuthentication();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
};
