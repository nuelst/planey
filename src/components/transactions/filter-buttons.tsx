import {
	DashboardIcon,
	DownloadIcon,
	TrashIcon,
	UploadIcon,
} from "@radix-ui/react-icons";
import type { TransactionFiltersViewModel } from "../../view-models/transactions";
import { Button } from "../ui/button";

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
			icon: DownloadIcon,
			isActive: filters.isShowingIncome,
			onClick: filters.showIncome,
		},
		{
			label: "Saídas",
			icon: UploadIcon,
			isActive: filters.isShowingOutcome,
			onClick: filters.showOutcome,
		},
	];

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				{mainButtons.map((button) => (
					<Button
						key={button.label}
						variant={button.isActive ? "filter-active" : "filter"}
						onClick={button.onClick}
					>
						<button.icon className="h-4 w-4" />
						{button.label}
					</Button>
				))}
			</div>

			<Button
				variant={filters.isShowingDeleted ? "filter-active" : "filter"}
				onClick={filters.showDeleted}
			>
				<TrashIcon className="h-4 w-4" />
				Excluídos
			</Button>
		</div>
	);
}
