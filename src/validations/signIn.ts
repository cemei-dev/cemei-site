import { z } from "zod";

import email from "@/common/validation/email";

const SignInFormSchema = z.object({
  email,
  password: z
    .string({ required_error: "Digite a senha" })
    .min(6, "Deve ter no mínimo 6 caracteres")
});

export default SignInFormSchema;
