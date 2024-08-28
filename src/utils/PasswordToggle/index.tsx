import { SetPasswordVisible } from "./types";
const PasswordToggle = (setPasswordVisible: SetPasswordVisible) => {
  setPasswordVisible((prev: boolean) => !prev);
};

export { PasswordToggle };
