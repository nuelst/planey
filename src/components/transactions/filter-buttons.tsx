import {
	ArchiveIcon,
	ArrowDownIcon,
	ArrowUpIcon,
	DashboardIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../lib/cn";
import type { TransactionFiltersViewModel } from "../../view-models/transactions";

interface FilterButtonsProps {
	filters: TransactionFiltersViewModel;
}

export function FilterButtons({ filters }: FilterButtonsProps) {
	const buttons = [
		{
			label: "Todos",
			icon: DashboardIcon,
			isActive: filters.isShowingAll,
			onClick: filters.showAll,
		},
		{
			label: "Entradas",
			icon: ArrowDownIcon,
			isActive: filters.isShowingIncome,
			onClick: filters.showIncome,
		},
		{
			label: "Saídas",
			icon: ArrowUpIcon,
			isActive: filters.isShowingOutcome,
			onClick: filters.showOutcome,
		},
		{
			label: "Excluídos",
			icon: ArchiveIcon,
			isActive: filters.isShowingDeleted,
			onClick: filters.showDeleted,
		},
	];

	return (
		<div className="flex items-center gap-2">
			{buttons.map((button) => (
				<button
					key={button.label}
					type="button"
					onClick={button.onClick}
					className={cn(
						"inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-colors",
						button.isActive
							? "bg-brand text-brand-text border-brand-border"
							: "bg-transparent text-text-secondary border-border hover:text-text-primary hover:border-border-hover",
					)}
				>
					<button.icon className="h-4 w-4" />
					{button.label}
				</button>
			))}
		</div>
	);
}
