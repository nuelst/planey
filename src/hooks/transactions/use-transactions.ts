import { useQuery } from "@tanstack/react-query";
import { listTransactions } from "../../api/transactions";
import type { TransactionFilters } from "../../types/transaction";
import { transactionKeys } from "./keys";

export function useTransactions(filters?: TransactionFilters) {
	return useQuery({
		queryKey: transactionKeys.list(filters),
		queryFn: () => listTransactions(filters),
	});
}
