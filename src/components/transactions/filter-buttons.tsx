import {
	DashboardIcon,
	DownloadIcon,
	TrashIcon,
	UploadIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../lib/cn";
import type { TransactionFiltersViewModel } from "../../view-models/transactions";

interface FilterButtonsProps {
	filters: TransactionFiltersViewModel;
}

export function FilterButtons({ filters }: FilterButtonsProps) {
	const mainButtons = [
		{
			label: "Todos",
			icon: DashboardIcon,
			isActive: filters.isShowingAll,
			onClick: filters.showAll,
		},
		{
			label: "Entradas",
			icon: UploadIcon,
			isActive: filters.isShowingIncome,
			onClick: filters.showIncome,
		},
		{
			label: "Saídas",
			icon: DownloadIcon,
			isActive: filters.isShowingOutcome,
			onClick: filters.showOutcome,
		},
	];

	const buttonClasses = (isActive: boolean) =>
		cn(
			"inline-flex items-center gap-2 py-2 px-[14px] text-sm font-medium rounded-[42px] border transition-colors cursor-pointer",
			isActive
				? "bg-active-bg text-active-text border-active-border"
				: "bg-dialog-bg text-text-primary border-dialog-border hover:bg-surface-hover",
		);

	return (
		<div className="flex items-center justify-between">
			{/* Grupo principal: Todos, Entradas, Saídas - gap 12px */}
			<div className="flex items-center gap-3">
				{mainButtons.map((button) => (
					<button
						key={button.label}
						type="button"
						onClick={button.onClick}
						className={buttonClasses(button.isActive)}
					>
						<button.icon className="h-4 w-4" />
						{button.label}
					</button>
				))}
			</div>

			{/* Excluídos - separado à direita */}
			<button
				type="button"
				onClick={filters.showDeleted}
				className={buttonClasses(filters.isShowingDeleted)}
			>
				<TrashIcon className="h-4 w-4" />
				Excluídos
			</button>
		</div>
	);
}
