import {
	hardDeleteTransaction,
	restoreTransaction,
	softDeleteTransaction,
} from "../../api/transactions";
import { useTransactionMutation } from "./use-transaction-mutation";

export function useSoftDeleteTransaction() {
	return useTransactionMutation({
		mutationFn: softDeleteTransaction,
	});
}

export function useRestoreTransaction() {
	return useTransactionMutation({
		mutationFn: restoreTransaction,
	});
}

export function useHardDeleteTransaction() {
	return useTransactionMutation({
		mutationFn: hardDeleteTransaction,
		removeQueryOnSuccess: true,
	});
}
