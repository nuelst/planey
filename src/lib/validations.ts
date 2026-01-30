import { z } from "zod";

export const transactionSchema = z.object({
	type: z.enum(["income", "outcome"], {
		error: "Selecione o tipo da transação",
	}),
	amount: z
		.number({
			error: "O valor deve ser um número válido",
		})
		.positive("O valor deve ser positivo")
		.min(1, "O valor deve ser maior que zero"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
