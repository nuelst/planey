import { useMemo } from "react";
import {
	useSoftDeleteTransaction,
	useTransactions,
} from "../../hooks/transactions";
import { formatCurrency, formatDate } from "../../lib/formatters";
import type { TransactionFilters } from "../../types/transaction";

export function useTransactionsViewModel(filters?: TransactionFilters) {
	const { data, isLoading, isError, error } = useTransactions(filters);
	const softDeleteMutation = useSoftDeleteTransaction();

	const transactions = useMemo(() => {
		if (!data?.data) return [];

		return data.data.map((transaction) => ({
			...transaction,
			formattedAmount: formatCurrency(transaction.amount),
			formattedDate: formatDate(transaction.createdAt),
			isIncome: transaction.type === "income",
			isOutcome: transaction.type === "outcome",
			isDeleted: transaction.deletedAt !== null,
		}));
	}, [data?.data]);

	const summary = useMemo(() => {
		if (!data?.data) {
			return {
				totalIncome: 0,
				totalOutcome: 0,
				balance: 0,
				formattedIncome: formatCurrency(0),
				formattedOutcome: formatCurrency(0),
				formattedBalance: formatCurrency(0),
			};
		}

		const totalIncome = data.data
			.filter((t) => t.type === "income" && !t.deletedAt)
			.reduce((sum, t) => sum + t.amount, 0);

		const totalOutcome = data.data
			.filter((t) => t.type === "outcome" && !t.deletedAt)
			.reduce((sum, t) => sum + t.amount, 0);

		const balance = totalIncome - totalOutcome;

		return {
			totalIncome,
			totalOutcome,
			balance,
			formattedIncome: formatCurrency(totalIncome),
			formattedOutcome: formatCurrency(totalOutcome),
			formattedBalance: formatCurrency(balance),
		};
	}, [data?.data]);

	const pagination = useMemo(() => {
		if (!data) {
			return {
				currentPage: 1,
				totalPages: 1,
				totalItems: 0,
				hasNextPage: false,
				hasPrevPage: false,
			};
		}

		return {
			currentPage: data.prev ? data.prev + 1 : 1,
			totalPages: data.pages,
			totalItems: data.items,
			hasNextPage: data.next !== null,
			hasPrevPage: data.prev !== null,
		};
	}, [data]);

	const deleteTransaction = (id: string) => {
		softDeleteMutation.mutate(id);
	};

	return {
		transactions,
		summary,
		pagination,

		isLoading,
		isError,
		error,
		isDeleting: softDeleteMutation.isPending,

		deleteTransaction,
	};
}

export type TransactionsViewModel = ReturnType<typeof useTransactionsViewModel>;
