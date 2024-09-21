import { ButtonConfig } from "./types";

export const guestButtons: ButtonConfig[] = [
  { text: "Home", to: "/" },
  { text: "Entrar", to: "/login" },
  { text: "Cadastrar", to: "/register" },
];

export const userButtons: ButtonConfig[] = [
  { text: "Novo Post", to: "/posts/create" },
  { text: "Dashboard", to: "/dashboard" },
  { text: "Clima", to: "/weather" },
];

export const aboutButton: ButtonConfig = {
  text: "Sobre",
  to: "/about",
};

export const logoutButton: ButtonConfig = {
  text: "Sair",
  onClick: () => {
    console.log("Logging out...");
  },
  disabled: false,
};
