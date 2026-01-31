import { z } from "zod";

export const transactionSchema = z.object({
	type: z.enum(["income", "outcome"], {
		error: "Selecione o tipo da transação",
	}),
	amount: z
		.number({
			error: "O valor deve ser um número válido",
		})
		.positive("O valor precisa ser diferente de 0.00"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
