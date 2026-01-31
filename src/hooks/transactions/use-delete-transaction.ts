import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	hardDeleteTransaction,
	restoreTransaction,
	softDeleteTransaction,
} from "../../api/transactions";
import { transactionKeys } from "./keys";

export function useSoftDeleteTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => softDeleteTransaction(id),
		onSuccess: (_, deletedId) => {
			queryClient.invalidateQueries({
				queryKey: transactionKeys.detail(deletedId),
			});
			queryClient.invalidateQueries({
				queryKey: transactionKeys.lists(),
				refetchType: "all",
			});
		},
	});
}

export function useRestoreTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => restoreTransaction(id),
		onSuccess: (_, restoredId) => {
			queryClient.invalidateQueries({
				queryKey: transactionKeys.detail(restoredId),
			});
			queryClient.invalidateQueries({
				queryKey: transactionKeys.lists(),
				refetchType: "all",
			});
		},
	});
}

export function useHardDeleteTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => hardDeleteTransaction(id),
		onSuccess: (_, deletedId) => {
			queryClient.removeQueries({
				queryKey: transactionKeys.detail(deletedId),
			});
			queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
		},
	});
}
