import { z } from "zod";

export const AddActionResultSchema = z.object({
  result: z.string().min(3, {
    message: "Título deve ter no mínimo 3 caracteres"
  }),
  imageUrl: z.any()
});

export type AddActionResultForm = z.infer<typeof AddActionResultSchema>;
