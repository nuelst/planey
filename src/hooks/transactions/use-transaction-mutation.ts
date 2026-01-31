import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionKeys } from "./keys";

interface UseTransactionMutationOptions<TData, TVariables> {
	mutationFn: (variables: TVariables) => Promise<TData>;
	onSuccessMessage?: string;
	invalidateDetail?: boolean;
	removeQueryOnSuccess?: boolean;
}

export function useTransactionMutation<TData, TVariables = string>({
	mutationFn,
	onSuccessMessage,
	invalidateDetail = true,
	removeQueryOnSuccess = false,
}: UseTransactionMutationOptions<TData, TVariables>) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: (_, variables) => {
			const id = typeof variables === "string" ? variables : undefined;

			if (id) {
				if (removeQueryOnSuccess) {
					queryClient.removeQueries({
						queryKey: transactionKeys.detail(id),
					});
				} else if (invalidateDetail) {
					queryClient.invalidateQueries({
						queryKey: transactionKeys.detail(id),
					});
				}
			}

			queryClient.invalidateQueries({
				queryKey: transactionKeys.lists(),
				refetchType: "all",
			});

			if (onSuccessMessage) {
				toast.success(onSuccessMessage);
			}
		},
		onError: (error) => {
			toast.error("Erro ao processar operação", {
				description:
					error instanceof Error ? error.message : "Tente novamente mais tarde",
			});
		},
	});
}
