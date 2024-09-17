import {
  MdHome,
  MdPerson,
  MdAdd,
  MdDashboard,
  MdCloud,
  MdInfo,
} from "react-icons/md";
import { ButtonConfig } from "./types";

export const getButtonData = (user: any): ButtonConfig[] => [
  { text: "Home", to: "/", icon: <MdHome />, show: true },
  { text: "Entrar", to: "/login", icon: <MdPerson />, show: !user },
  { text: "Cadastrar", to: "/register", icon: <MdAdd />, show: !user },
  { text: "Novo Post", to: "/posts/create", icon: <MdAdd />, show: !!user },
  { text: "Dashboard", to: "/dashboard", icon: <MdDashboard />, show: !!user },
  { text: "Clima", to: "/weather", icon: <MdCloud />, show: !!user },
  { text: "Sobre", to: "/about", icon: <MdInfo />, show: true },
];
