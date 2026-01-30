export type TransactionType = "income" | "outcome";

export interface Transaction {
	id: string;
	type: TransactionType;
	amount: number;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTransactionInput {
	type: TransactionType;
	amount: number;
}

export interface UpdateTransactionInput {
	type?: TransactionType;
	amount?: number;
	deletedAt?: string | null;
}

export interface PaginatedResponse<T> {
	data: T[];
	first: number;
	prev: number | null;
	next: number | null;
	last: number;
	pages: number;
	items: number;
}

export interface TransactionFilters {
	type?: TransactionType | "deleted";
	page?: number;
	perPage?: number;
}
