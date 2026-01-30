import { httpClient } from "../../lib/http-client";
import type { Transaction } from "../../types/transaction";
import { updateTransaction } from "./update";

export async function softDeleteTransaction(id: string): Promise<Transaction> {
	return updateTransaction(id, {
		deletedAt: new Date().toISOString(),
	});
}

export async function restoreTransaction(id: string): Promise<Transaction> {
	return updateTransaction(id, {
		deletedAt: null,
	});
}

export async function hardDeleteTransaction(id: string): Promise<void> {
	await httpClient.delete(`/transactions/${id}`);
}
