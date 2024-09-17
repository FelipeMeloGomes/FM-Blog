import {
  MdHome,
  MdPerson,
  MdAdd,
  MdDashboard,
  MdCloud,
  MdInfo,
  MdLogout,
} from "react-icons/md";
import { ButtonConfig } from "./types";

export const guestButtons: ButtonConfig[] = [
  { text: "Home", icon: <MdHome />, to: "/" },
  { text: "Entrar", icon: <MdPerson />, to: "/login" },
  { text: "Cadastrar", icon: <MdAdd />, to: "/register" },
];

export const userButtons: ButtonConfig[] = [
  { text: "Novo Post", icon: <MdAdd />, to: "/posts/create" },
  { text: "Dashboard", icon: <MdDashboard />, to: "/dashboard" },
  { text: "Clima", icon: <MdCloud />, to: "/weather" },
];

export const aboutButton: ButtonConfig = {
  text: "Sobre",
  icon: <MdInfo />,
  to: "/about",
};

export const logoutButton: ButtonConfig = {
  text: "Sair",
  icon: <MdLogout />,
  onClick: true,
};
