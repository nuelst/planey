import { httpClient } from "../../lib/http-client";
import type {
	PaginatedResponse,
	Transaction,
	TransactionFilters,
} from "../../types/transaction";

export async function listTransactions(
	filters?: TransactionFilters,
): Promise<PaginatedResponse<Transaction>> {
	const { data } = await httpClient.get<PaginatedResponse<Transaction>>(
		"/transactions",
		{
			params: {
				_page: filters?.page,
				_per_page: filters?.perPage,
				_sort: "-createdAt",
				type: filters?.type !== "deleted" ? filters?.type : undefined,
				deletedAt: filters?.type === "deleted" ? undefined : "null",
				deletedAt_ne: filters?.type === "deleted" ? "null" : undefined,
			},
		},
	);

	return data;
}
