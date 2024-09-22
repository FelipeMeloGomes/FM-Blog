import { ButtonConfig } from "./types";

export const guestButtons: ButtonConfig[] = [
  { text: "Entrar", to: "/login" },
  { text: "Cadastrar", to: "/register" },
];

export const userButtons: ButtonConfig[] = [
  { text: "Novo Post", to: "/posts/create" },
  { text: "Dashboard", to: "/dashboard" },
];
