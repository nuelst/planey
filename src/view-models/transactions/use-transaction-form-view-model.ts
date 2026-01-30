import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	useCreateTransaction,
	useTransaction,
	useUpdateTransaction,
} from "../../hooks/transactions";
import { fromCents, toCents } from "../../lib/formatters";
import { transactionSchema } from "../../lib/validations";
import type { TransactionType } from "../../types/transaction";

interface UseTransactionFormViewModelProps {
	transactionId?: string;
	onSuccess?: () => void;
}

export function useTransactionFormViewModel({
	transactionId,
	onSuccess,
}: UseTransactionFormViewModelProps = {}) {
	const isEditing = !!transactionId;

	const { data: transaction, isLoading: isLoadingTransaction } = useTransaction(
		transactionId ?? "",
	);

	const createMutation = useCreateTransaction();
	const updateMutation = useUpdateTransaction();

	const form = useForm({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			type: "income" as TransactionType,
			amount: 0,
		},
	});

	useEffect(() => {
		if (transaction && isEditing) {
			form.reset({
				type: transaction.type,
				amount: fromCents(transaction.amount),
			});
		}
	}, [transaction, isEditing, form]);

	const handleSubmit = form.handleSubmit(async (data) => {
		const amountInCents = toCents(data.amount);

		if (isEditing && transactionId) {
			await updateMutation.mutateAsync({
				id: transactionId,
				data: {
					type: data.type,
					amount: amountInCents,
				},
			});
		} else {
			await createMutation.mutateAsync({
				type: data.type,
				amount: amountInCents,
			});
		}

		form.reset();
		onSuccess?.();
	});

	const resetForm = () => {
		form.reset({
			type: "income",
			amount: 0,
		});
	};

	return {
		// Form
		form,
		handleSubmit,
		resetForm,

		isEditing,
		isLoading: isLoadingTransaction,
		isSubmitting: createMutation.isPending || updateMutation.isPending,
		isSuccess: createMutation.isSuccess || updateMutation.isSuccess,
		isError: createMutation.isError || updateMutation.isError,
		error: createMutation.error || updateMutation.error,

		register: form.register,
		errors: form.formState.errors,
		watch: form.watch,
		setValue: form.setValue,
	};
}

export type TransactionFormViewModel = ReturnType<
	typeof useTransactionFormViewModel
>;
