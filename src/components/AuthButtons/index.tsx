import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import type { AuthButtonsProps } from "./types";

const AuthButtons = ({ handleGoogleLogin, loading }: AuthButtonsProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
      <Button onClick={handleGoogleLogin} variant="outline" className="w-full" disabled={loading}>
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export { AuthButtons };
