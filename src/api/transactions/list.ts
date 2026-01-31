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
	const page = filters?.page ?? 1;
	const perPage = filters?.perPage ?? 10;

	if (isDeleted) {
		const { data: allTransactions } = await httpClient.get<Transaction[]>(
			"/transactions",
			{
				params: {
					_sort: "-createdAt",
				},
			},
		);

		const deletedTransactions = allTransactions.filter(
			(t) => t.deletedAt !== null,
		);

		const start = (page - 1) * perPage;
		const end = start + perPage;
		const paginatedData = deletedTransactions.slice(start, end);

		const totalItems = deletedTransactions.length;
		const totalPages = Math.ceil(totalItems / perPage);

		return {
			data: paginatedData,
			first: 1,
			prev: page > 1 ? page - 1 : null,
			next: page < totalPages ? page + 1 : null,
			last: totalPages,
			pages: totalPages,
			items: totalItems,
		};
	}

	const { data } = await httpClient.get<PaginatedResponse<Transaction>>(
		"/transactions",
		{
			params: {
				_page: page,
				_per_page: perPage,
				_sort: "-createdAt",
				type: filters?.type,
				deletedAt: "null",
			},
		},
	);

	return data;
}
