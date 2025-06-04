import { z } from "zod";

const addInvestmentFormSchema = z.object({
  amount: z
    .string({ required_error: "Valor é obrigatório" })
    .regex(
      /^(?!0)[0-9.,]+$/,
      "O valor deve ser um número maior que zero e não pode conter letras"
    ),
  timerange: z.enum(
    [
      "1º Trimestre",
      "2º Trimestre",
      "3º Trimestre",
      "4º Trimestre",
      "Ano inteiro"
    ],
    {
      required_error: "Período é obrigatório"
    }
  ),
  category: z
    .array(z.string(), { required_error: "Categoria é obrigatória" })
    .min(1, "Pelo menos uma categoria deve ser selecionada"),
  year: z
    .string({
      required_error: "Ano é obrigatório"
    })
    .min(1, "Selecione um ano")
});

export default addInvestmentFormSchema;
