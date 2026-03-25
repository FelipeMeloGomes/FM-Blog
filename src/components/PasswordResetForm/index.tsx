import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { TextInputWithIcon } from "../TextInputWithIcon";
import type { PasswordResetFormProps } from "./types";

const PasswordResetForm = ({ formData, setFormData, error }: PasswordResetFormProps) => (
  <>
    <TextInputWithIcon
      label="Email para redefinição de senha"
      name="email"
      iconName={<FiMail />}
      value={formData.email}
      minLength={6}
      required
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="Insira seu email"
      alt="Insira seu email"
    />
    <Button alt="Enviar e-mail de redefinição" disabled={formData.email === ""}>
      Enviar e-mail de redefinição
    </Button>
    <div className="mt-4">
      <Link to="/login">
        <Button>Voltar ao login</Button>
      </Link>
    </div>
    {error && <p className="error">{error}</p>}
  </>
);

export { PasswordResetForm };
