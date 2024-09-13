import { TextInputWithIcon } from "../TextInputWithIcon";
import { SubmitButton } from "../SubmitButton";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PasswordResetFormProps } from "./types";

const PasswordResetForm = ({
  formData,
  setFormData,
  error,
}: PasswordResetFormProps) => (
  <>
    <TextInputWithIcon
      label="Email para redefinição de senha"
      name="email"
      iconName="Sign"
      value={formData.email}
      minLength={6}
      required
      onChange={(e) => setFormData({ email: e.target.value })}
      placeholder="Insira seu email"
      alt="Insira seu email"
    />
    <SubmitButton
      alt="Enviar e-mail de redefinição"
      disabled={formData.email === ""}
    >
      Enviar e-mail de redefinição
    </SubmitButton>
    <Box mt={4}>
      <Link to="/login">
        <Button>Voltar ao login</Button>
      </Link>
    </Box>
    {error && <p className="error">{error}</p>}
  </>
);

export { PasswordResetForm };
