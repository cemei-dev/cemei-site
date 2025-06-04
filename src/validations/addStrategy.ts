import { z } from "zod";

export const AddStrategySchema = z.object({
  title: z.string().min(3, {
    message: "Título deve ter no mínimo 3 caracteres"
  }),
  date: z.date(),
  obs: z.string().optional()
});

export type AddStrategyForm = z.infer<typeof AddStrategySchema>;
