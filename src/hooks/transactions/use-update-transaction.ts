import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../../api/transactions";
import type { UpdateTransactionInput } from "../../types/transaction";
import { transactionKeys } from "./keys";

export function useUpdateTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateTransactionInput }) =>
			updateTransaction(id, data),
		onSuccess: (updatedTransaction) => {
			queryClient.setQueryData(
				transactionKeys.detail(updatedTransaction.id),
				updatedTransaction,
			);
			queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
		},
	});
}
