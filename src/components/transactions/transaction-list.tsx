import type { TransactionsViewModel } from "../../view-models/transactions";
import { TransactionItem } from "./transaction-item";

interface TransactionListProps {
	vm: TransactionsViewModel;
	onItemClick?: (id: string) => void;
	onRestore?: (id: string) => void;
}

export function TransactionList({
	vm,
	onItemClick,
	onRestore,
}: TransactionListProps) {
	if (vm.isLoading) {
		return (
			<div className="flex flex-col gap-3">
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={`skeleton-${i}-${Date.now()}`}
						className="h-16 rounded-lg bg-surface animate-pulse"
					/>
				))}
			</div>
		);
	}

	if (vm.isError) {
		return (
			<div className="flex items-center justify-center p-8 rounded-lg bg-surface border border-destructive-border">
				<p className="text-outcome">Erro ao carregar transações</p>
			</div>
		);
	}

	if (vm.transactions.length === 0) {
		return (
			<div className="flex items-center justify-center p-8 rounded-lg bg-surface border border-border">
				<p className="text-text-secondary">Nenhuma transação encontrada</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{vm.transactions.map((transaction) => (
				<TransactionItem
					key={transaction.id}
					id={transaction.id}
					type={transaction.type}
					formattedAmount={transaction.formattedAmount}
					isDeleted={transaction.isDeleted}
					onDelete={vm.deleteTransaction}
					onRestore={onRestore}
					onClick={onItemClick}
				/>
			))}
		</div>
	);
}
