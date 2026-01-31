import { httpClient } from "../../lib/http-client";
import type {
	PaginatedResponse,
	Transaction,
	TransactionFilters,
} from "../../types/transaction";

export async function listTransactions(
	filters?: TransactionFilters,
): Promise<PaginatedResponse<Transaction>> {
	const isDeleted = filters?.type === "deleted";

	const { data } = await httpClient.get<PaginatedResponse<Transaction>>(
		"/transactions",
		{
			params: {
				_page: filters?.page,
				_per_page: filters?.perPage,
				_sort: "-createdAt",
				type: !isDeleted ? filters?.type : undefined,
				...(isDeleted ? { deletedAt_ne: "null" } : { deletedAt: "null" }),
			},
		},
	);

	return data;
}
