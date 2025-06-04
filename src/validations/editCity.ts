import { z } from "zod";

import email from "@/common/validation/email";

export const EditCitySchema = z.object({
  contactPhones: z.array(z.string().min(15)).min(1, "O telefone é obrigatório"),
  contactEmails: z.array(email).min(1, "O email é obrigatório"),
  cityImageUrl: z.any()
});

export type EditCityForm = z.infer<typeof EditCitySchema>;
