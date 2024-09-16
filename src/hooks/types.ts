import { getAuth } from "firebase/auth";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

export interface UserData {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthenticationState {
  error: string | null;
  loading: boolean;
  cancelled: boolean;
}

export interface AuthenticationResult {
  auth: ReturnType<typeof getAuth>;
  createUser: (data: UserData) => Promise<void>;
  error: string | null;
  logout: () => void;
  login: (data: Omit<UserData, "displayName">) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

export interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthFormHook {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  passwordVisible: boolean;
  setPasswordVisible: Dispatch<SetStateAction<boolean>>;
  passwordVisibleTwo: boolean;
  setPasswordVisibleTwo: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data?: FormData,
  ) => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  loading: boolean;
}

export interface CitySearchHook {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  showDetails: boolean;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  search: () => Promise<void>;
}

export type FetchDataFunction = (city: string) => Promise<void>;

export interface DeleteState {
  loading: boolean | null;
  error: string | null;
}

export type DeleteAction =
  | { type: "LOADING" }
  | { type: "DELETED_DOC" }
  | { type: "ERROR"; payload: string };

export interface DocumentData {
  tagsArray?: string[];
  body?: string | TrustedHTML;
  createdBy?: string;
  image?: string;
  id?: string;
  title?: string;
  content?: string;
}

export interface FetchDocumentResult {
  document: DocumentData | null;
  loading: boolean;
  error: string | null;
}

export interface DocumentData {
  id?: string;
  title?: string;
  content?: string;
  likes?: string[];
  likeCount?: number;
}

export interface FetchDocumentsResult {
  documents: DocumentData[] | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  uid: string;
  displayName: string;
}

export interface FormSubmitHook {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formError: string;
}

export interface FormData {
  title: string;
  image: string;
  body: string;
  tagsArray: string[];
  uid: string;
  createdBy: string;
  likeCount: number;
  likes: string[];
}

export interface FormSubmitProps {
  insertDocument: (formData: FormData) => void;
  updateDocument: (id: string, formData: FormData) => void;
  navigate: ReturnType<typeof useNavigate>;
  titleRef: React.MutableRefObject<HTMLInputElement | null>;
  imageRef: React.MutableRefObject<HTMLInputElement | null>;
  bodyRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  tagsRef: React.MutableRefObject<HTMLInputElement | null>;
  user: User;
  actionType: "create" | "edit";
  postId: string;
}

export interface InsertState {
  loading: boolean | null;
  error: string | null;
}

export type InsertAction =
  | { type: "LOADING" }
  | { type: "INSERTED_DOC" }
  | { type: "ERROR"; payload: string };

export interface UseLikeButtonProps {
  postId: string;
  userId?: string;
  onNotLoggedIn?: () => void;
}

export interface UseLikeButtonResult {
  likeCount: number;
  liked: boolean;
  loading: boolean;
  handleLikeClick: () => void;
}

export interface UseLikeResult {
  likePost: (postId: string, userId: string) => Promise<void>;
  isLiked: (postId: string, userId: string) => Promise<boolean>;
  getLikeCount: (postId: string) => Promise<number>;
  error: string | null;
}

export interface PostFormHook {
  titleRef: React.RefObject<HTMLInputElement>;
  imageRef: React.RefObject<HTMLInputElement>;
  bodyRef: React.RefObject<HTMLTextAreaElement>;
  tagsRef: React.RefObject<HTMLInputElement>;
  navigate: ReturnType<typeof useNavigate>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  validateImageUrl: (url: string) => void;
  errorParagraph: (errorMessage: string) => JSX.Element;
}

export interface SearchPostHook {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export interface UpdateState {
  loading: boolean | null;
  error: string | null;
}

export type UpdateAction =
  | { type: "LOADING" }
  | { type: "UPDATED_DOC" }
  | { type: "ERROR"; payload: string };

export interface WeatherData {
  humidity: string;
  wind: string;
  temperature: string;
  location: string;
}
export interface WeatherIconMap {
  [key: string]: ReactElement;
}
export interface WeatherHook {
  isLoading: boolean;
  climaData: WeatherData;
  fetchData: (city: string) => Promise<void>;
  wicon: ReactElement;
}
