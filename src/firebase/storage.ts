import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export const uploadPostImage = async (file: File, uid: string): Promise<string> => {
  const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const storageRef = ref(storage, `posts/${uid}/${filename}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};
