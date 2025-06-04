import { z } from "zod";

export const AddActionSchema = z.object({
  title: z.string().min(3, {
    message: "Título deve ter no mínimo 3 caracteres"
  }),
  date: z.date(),
  status: z.string(),
  needMoney: z.boolean(),
  obs: z.string().optional()
});

export type AddActionForm = z.infer<typeof AddActionSchema>;
