import { z } from "zod";

export const AddAccomplishmentSchema = z.object({
  title: z
    .string({ required_error: "Título é obrigatóroio" })
    .min(3, { message: "Título deve ter no mínimo 3 caracteres" })
    .max(28, { message: "Título deve ter no máximo 28 caracteres" }),
  text: z
    .string({ required_error: "Texto é obrigatóroio" })
    .min(3, { message: "Texto deve ter no mínimo 3 caracteres" })
    .max(243, { message: "Texto deve ter no máximo 240 caracteres" }),
  imageUrl: z.any()
});

export type AddAccomplishmentForm = z.infer<typeof AddAccomplishmentSchema>;
