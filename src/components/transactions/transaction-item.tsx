import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/cn";
import { Button } from "../ui/button";

interface TransactionItemProps {
	id: string;
	type: "income" | "outcome";
	formattedAmount: string;
	isDeleted?: boolean;
	onDelete?: (id: string) => void;
	onRestore?: (id: string) => void;
	onClick?: (id: string) => void;
}

export function TransactionItem({
	id,
	type,
	formattedAmount,
	isDeleted = false,
	onDelete,
	onRestore,
	onClick,
}: TransactionItemProps) {
	const isIncome = type === "income";

	return (
		<div
			className={cn(
				"flex items-center justify-between w-full h-16 py-4 px-6 border-b border-dialog-border last:border-b-0 transition-colors",
				"hover:bg-surface-hover",
			)}
		>
			<button
				type="button"
				className="flex items-center gap-3 flex-1 cursor-pointer"
				onClick={() => onClick?.(id)}
			>
				{isIncome ? (
					<ArrowDownIcon className="h-5 w-5 text-income" />
				) : (
					<ArrowUpIcon className="h-5 w-5 text-outcome" />
				)}
				<span
					className={cn(
						"text-lg font-medium",
						isIncome ? "text-income" : "text-outcome",
					)}
				>
					{formattedAmount}
				</span>
			</button>

			{isDeleted ? (
				<Button variant="outline" size="sm" onClick={() => onRestore?.(id)}>
					Restaurar
				</Button>
			) : (
				<Button
					variant="icon-destructive"
					size="icon"
					onClick={() => onDelete?.(id)}
					aria-label="Excluir transação"
				>
					<TrashIcon className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
