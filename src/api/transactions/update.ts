import { httpClient } from "../../lib/http-client";
import type {
	Transaction,
	UpdateTransactionInput,
} from "../../types/transaction";

export async function updateTransaction(
	id: string,
	input: UpdateTransactionInput,
): Promise<Transaction> {
	const { data } = await httpClient.patch<Transaction>(`/transactions/${id}`, {
		...input,
		updatedAt: new Date().toISOString(),
	});

	return data;
}
