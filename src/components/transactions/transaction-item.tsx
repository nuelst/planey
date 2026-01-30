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
		<button
			type="button"
			className={cn(
				"flex items-center justify-between w-full p-4 rounded-lg bg-surface border border-transparent transition-colors cursor-pointer text-left",
				"hover:border-outcome/50 hover:bg-surface-hover",
			)}
			onClick={() => onClick?.(id)}
		>
			<div className="flex items-center gap-3">
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
			</div>

			{isDeleted ? (
				<Button
					variant="outline"
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						onRestore?.(id);
					}}
				>
					Restaurar
				</Button>
			) : (
				<Button
					variant="destructive"
					size="icon"
					onClick={(e) => {
						e.stopPropagation();
						onDelete?.(id);
					}}
					aria-label="Excluir transação"
				>
					<TrashIcon className="h-4 w-4" />
				</Button>
			)}
		</button>
	);
}
