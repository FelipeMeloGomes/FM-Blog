import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export type ColorMode = "light" | "dark";

export interface UserPreferences {
  colorMode: ColorMode;
}

export const getUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const docRef = doc(db, "userPreferences", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserPreferences;
    }

    return null;
  } catch {
    return null;
  }
};

export const setUserColorMode = async (colorMode: ColorMode): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "userPreferences", user.uid);
    await setDoc(docRef, { colorMode }, { merge: true });
  } catch {
    // Silently fail - don't block UI on preference save errors
  }
};
