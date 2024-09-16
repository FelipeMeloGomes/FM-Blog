import { SetPasswordVisible } from "./types";
const PasswordToggle = (setPasswordVisible: SetPasswordVisible) => {
  setPasswordVisible((prev) => !prev);
};

export { PasswordToggle };
