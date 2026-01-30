import { httpClient } from "../../lib/http-client";
import type {
	CreateTransactionInput,
	Transaction,
} from "../../types/transaction";

export async function createTransaction(
	input: CreateTransactionInput,
): Promise<Transaction> {
	const now = new Date().toISOString();

	const { data } = await httpClient.post<Transaction>("/transactions", {
		...input,
		id: `tx_${Date.now()}`,
		deletedAt: null,
		createdAt: now,
		updatedAt: now,
	});

	return data;
}
