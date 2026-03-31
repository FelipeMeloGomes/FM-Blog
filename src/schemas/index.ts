import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(
        8,
        "A senha é muito fraca. Ela deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número."
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(10, "Título deve ter pelo menos 10 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres"),
  body: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
  tagsInput: z.string().min(1, "Tags são obrigatórias"),
});

export const editPostSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(10, "Título deve ter pelo menos 10 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres"),
  tagsInput: z.string().min(1, "Tags são obrigatórias"),
});

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comentário não pode estar vazio")
    .max(500, "Comentário deve ter no máximo 500 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type EditPostFormData = z.infer<typeof editPostSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
