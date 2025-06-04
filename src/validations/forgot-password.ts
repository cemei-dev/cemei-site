import { z } from "zod";

import email from "@/common/validation/email";

const ForgotPasswordFormSchema = z.object({
  email
});

export default ForgotPasswordFormSchema;
