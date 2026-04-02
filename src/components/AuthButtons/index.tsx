import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import type { AuthButtonsProps } from "./types";

const AuthButtons = ({ handleGoogleLogin, loading }: AuthButtonsProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full rounded-xl gap-2"
        disabled={loading}
      >
        <FaGoogle className="h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export { AuthButtons };
