import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FormField } from "../FormField";
import { Button } from "../ui/button";
import type { PasswordResetFormProps } from "./types";

const PasswordResetForm = ({ formData, setFormData, error }: PasswordResetFormProps) => (
  <div className="space-y-5">
    <FormField
      label="Email para redefinição de senha"
      name="email"
      type="email"
      icon={<FiMail />}
      value={formData.email}
      minLength={6}
      required
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="Insira seu email"
      autoComplete="email"
    />
    <Button className="rounded-xl w-full" disabled={formData.email === ""}>
      Enviar e-mail de redefinição
    </Button>
    <div className="pt-2">
      <Link to="/login" className="inline-block w-full">
        <Button variant="outline" className="rounded-xl w-full">
          Voltar ao login
        </Button>
      </Link>
    </div>
    {error && <p className="text-destructive text-sm animate-fade-in">{error}</p>}
  </div>
);

export { PasswordResetForm };
