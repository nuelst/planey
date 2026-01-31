import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { cn } from "../../lib/cn";
import { PAGE_SIZE_OPTIONS } from "../../lib/constants";
import type { TransactionFiltersViewModel } from "../../view-models/transactions";

interface PaginationProps {
	filters: TransactionFiltersViewModel;
	totalPages: number;
}

export function Pagination({ filters, totalPages }: PaginationProps) {
	const { currentPage, perPage, setPage, setPerPage } = filters;

	const pages = generatePageNumbers(currentPage, totalPages);

	return (
		<div className="flex items-center justify-between mt-[6px]">
			{/* qtd/página  */}
			<Select.Root
				value={String(perPage)}
				onValueChange={(value) => setPerPage(Number(value))}
			>
				<Select.Trigger className="inline-flex items-center gap-2 py-2 px-[14px] text-sm font-medium rounded-[8px] border border-dialog-border bg-dialog-bg text-text-primary hover:bg-surface-hover transition-colors cursor-pointer outline-none">
					<Select.Value />
					<Select.Icon>
						<ChevronDownIcon className="h-4 w-4" />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Content
						className="overflow-hidden rounded-[8px] border border-dialog-border bg-dialog-bg shadow-lg"
						position="popper"
						sideOffset={4}
					>
						<Select.Viewport className="p-1">
							{PAGE_SIZE_OPTIONS.map((size) => (
								<Select.Item
									key={size}
									value={String(size)}
									className="flex items-center px-3 py-2 text-sm text-text-primary rounded-[6px] cursor-pointer outline-none hover:bg-surface-hover data-[highlighted]:bg-surface-hover"
								>
									<Select.ItemText>{size}</Select.ItemText>
								</Select.Item>
							))}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			{/* paginação */}
			<div className="flex items-center gap-[10px]">
				<button
					type="button"
					onClick={() => setPage(currentPage - 1)}
					disabled={currentPage <= 1}
					aria-label="Página anterior"
					className="flex items-center justify-center h-8 w-8 rounded-[8px] border border-dialog-border bg-dialog-bg text-text-primary hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ChevronLeftIcon className="h-4 w-4" />
				</button>

				{pages.map((page, index) => (
					<button
						key={page === "..." ? `ellipsis-${index}` : `page-${page}`}
						type="button"
						disabled={page === "..."}
						onClick={() => typeof page === "number" && setPage(page)}
						className={cn(
							"flex items-center justify-center h-8 min-w-8 px-2 text-sm font-medium rounded-[8px] border transition-colors",
							page === currentPage
								? "bg-active-bg text-active-text border-active-border"
								: page === "..."
									? "text-text-muted cursor-default border-transparent"
									: "bg-dialog-bg text-text-primary border-dialog-border hover:bg-surface-hover",
						)}
					>
						{page}
					</button>
				))}

				<button
					type="button"
					onClick={() => setPage(currentPage + 1)}
					disabled={currentPage >= totalPages}
					aria-label="Próxima página"
					className="flex items-center justify-center h-8 w-8 rounded-[8px] border border-dialog-border bg-dialog-bg text-text-primary hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ChevronRightIcon className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}

function generatePageNumbers(
	current: number,
	total: number,
): (number | "...")[] {
	if (total <= 5) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	if (current <= 2) {
		return [1, 2, 3, "...", total];
	}

	if (current >= total - 1) {
		return [1, "...", total - 2, total - 1, total];
	}

	return [1, "...", current - 1, current, current + 1, "...", total];
}
