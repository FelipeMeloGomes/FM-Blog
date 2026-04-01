import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FormField } from "../FormField";
import { Button } from "../ui/button";
import type { PasswordResetFormProps } from "./types";

const PasswordResetForm = ({ formData, setFormData, error }: PasswordResetFormProps) => (
  <>
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
    <Button disabled={formData.email === ""}>Enviar e-mail de redefinição</Button>
    <div className="mt-4">
      <Link to="/login">
        <Button>Voltar ao login</Button>
      </Link>
    </div>
    {error && <p className="text-destructive text-sm">{error}</p>}
  </>
);

export { PasswordResetForm };
