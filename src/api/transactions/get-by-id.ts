import { httpClient } from "../../lib/http-client";
import type { Transaction } from "../../types/transaction";

export async function getTransactionById(id: string): Promise<Transaction> {
	const { data } = await httpClient.get<Transaction>(`/transactions/${id}`);
	return data;
}
