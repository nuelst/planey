import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../api/transactions";
import type { CreateTransactionInput } from "../../types/transaction";
import { transactionKeys } from "./keys";

export function useCreateTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateTransactionInput) => createTransaction(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
		},
	});
}
