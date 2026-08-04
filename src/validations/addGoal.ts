import { z } from "zod";

export const AddGoalSchema = z.object({
  number: z.coerce
    .number({ invalid_type_error: "Informe o número da meta" })
    .int("O número da meta deve ser inteiro")
    .positive("O número da meta deve ser positivo"),
  text: z.string().min(1, "A descrição da meta é obrigatória"),
  imageUrl: z.any().optional(),
  subGoals: z
    .array(z.string().min(1, "A descrição da submeta é obrigatória"))
    .optional()
});

export type AddGoalForm = z.infer<typeof AddGoalSchema>;
