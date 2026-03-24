import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { useFeedback } from "../../providers/ToastProvider";

const Profile = () => {
  const navigate = useNavigate();
  const { success, error, info } = useFeedback();
  const { user } = useAuthValue() || {};
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photoURL || null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const originalName = user?.name || "";

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setPhotoFile(null);
    setPhotoPreview(null);
  }, []);

  const validateName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "Nome é obrigatório";
    if (trimmed.length < 3) return "Nome deve ter pelo menos 3 caracteres";
    if (trimmed.length > 50) return "Nome deve ter no máximo 50 caracteres";
    return null;
  };

  const hasChanges = name.trim() !== originalName || photoFile !== null;

  const handleSave = async () => {
    const nameError = validateName(name);
    if (nameError) {
      error("Erro", nameError);
      return;
    }

    if (!hasChanges) {
      info("Info", "Nenhuma alteração foi feita.", { duration: 3000 });
      return;
    }

    setIsSaving(true);

    try {
      let photoURL: string | undefined = undefined;

      if (photoFile) {
        photoURL = await uploadToCloudinary(photoFile);
      }

      const authModule = await import("firebase/auth");
      const { updateProfile, getAuth } = authModule;

      const firebaseAuth = getAuth();
      const firebaseUser = firebaseAuth.currentUser;

      if (firebaseUser) {
        await updateProfile(firebaseUser, {
          displayName: name.trim(),
          ...(photoURL && { photoURL }),
        });
      }

      success("Sucesso", "Perfil atualizado com sucesso!");

      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar perfil.";
      error("Erro", errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <VStack spacing={8} maxW="md" mx="auto" align="stretch" py={8}>
      <HStack justify="flex-start">
        <Button as={RouterLink} to="/" variant="ghost" leftIcon={<ArrowBackIcon />} size="sm">
          Voltar
        </Button>
      </HStack>

      <Heading size="lg" fontFamily="heading" color="text.primary" textAlign="center">
        Meu Perfil
      </Heading>

      <VStack spacing={6} align="center">
        <Box position="relative">
          <Avatar
            size="2xl"
            name={name || user?.email || "Usuário"}
            src={photoPreview || user?.photoURL || undefined}
            bg="gray.200"
          />
        </Box>

        <Box textAlign="center">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handlePhotoChange}
            id="photo-input"
            style={{ display: "none" }}
          />
          <Button as="label" htmlFor="photo-input" variant="outline" size="sm" cursor="pointer">
            {photoPreview ? "Trocar foto" : "Adicionar foto"}
          </Button>
          {photoPreview && (
            <Button variant="ghost" size="xs" colorScheme="red" ml={2} onClick={handleRemovePhoto}>
              Remover
            </Button>
          )}
        </Box>
      </VStack>

      <VStack spacing={5} align="stretch">
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
            Nome completo
          </FormLabel>
          <Input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={55}
          />
          <HStack justify="space-between" mt={1}>
            <Text fontSize="xs" color="red.500">
              {name.trim() && validateName(name)}
            </Text>
            <Text fontSize="xs" color="text.tertiary">
              {name.length}/50
            </Text>
          </HStack>
        </FormControl>

        <FormControl isDisabled>
          <FormLabel fontSize="sm" fontWeight="medium" color="text.primary">
            E-mail
          </FormLabel>
          <Input value={email} isDisabled bg="gray.50" />
          <FormHelperText color="text.tertiary">O e-mail não pode ser alterado.</FormHelperText>
        </FormControl>
      </VStack>

      <Button
        variant="solid"
        size="lg"
        onClick={handleSave}
        isLoading={isSaving}
        isDisabled={!hasChanges}
      >
        Salvar alterações
      </Button>
    </VStack>
  );
};

export default Profile;
