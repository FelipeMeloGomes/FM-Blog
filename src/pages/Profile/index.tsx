import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormField } from "../../components/FormField";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useAuthValue } from "../../context/AuthContext";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { type ProfileFormData, profileSchema } from "../../schemas";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuthValue() || {};
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photoURL || null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "" },
  });

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

  const hasChanges = form.watch("name").trim() !== originalName || photoFile !== null;

  const onSubmit = async (data: ProfileFormData) => {
    if (!hasChanges) {
      toast.info("Nenhuma alteração foi feita.");
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
          displayName: data.name.trim(),
          ...(photoURL && { photoURL }),
        });
      }

      toast.success("Perfil atualizado com sucesso!");

      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar perfil.";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto py-8">
      <div className="flex justify-start">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <h1 className="text-2xl font-bold font-heading text-foreground text-center">Meu Perfil</h1>

      <div className="flex flex-col gap-6 items-center">
        <div className="relative">
          <Avatar className="h-32 w-32">
            <AvatarImage src={photoPreview || user?.photoURL || undefined} />
            <AvatarFallback>
              {form.watch("name")?.charAt(0) || user?.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center">
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handlePhotoChange}
            id="photo-input"
            className="hidden"
          />
          <Button asChild variant="outline" size="sm">
            <label htmlFor="photo-input" className="cursor-pointer">
              {photoPreview ? "Trocar foto" : "Adicionar foto"}
            </label>
          </Button>
          {photoPreview && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 text-red-500"
              onClick={handleRemovePhoto}
            >
              Remover
            </Button>
          )}
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          label="Nome completo"
          placeholder="Seu nome"
          error={form.formState.errors.name?.message}
          maxLength={55}
          {...form.register("name")}
        />

        <div className="space-y-2">
          <label htmlFor="email-display" className="text-sm font-medium">
            E-mail
          </label>
          <input
            id="email-display"
            type="text"
            value={user?.email || ""}
            disabled
            className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado.</p>
        </div>

        <Button type="submit" size="lg" disabled={isSaving || !hasChanges}>
          {isSaving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  );
};

export default Profile;
