import { useQuery } from "@tanstack/react-query";
import { getTransactionById } from "../../api/transactions";
import { transactionKeys } from "./keys";

export function useTransaction(id: string) {
	return useQuery({
		queryKey: transactionKeys.detail(id),
		queryFn: () => getTransactionById(id),
		enabled: !!id,
	});
}
