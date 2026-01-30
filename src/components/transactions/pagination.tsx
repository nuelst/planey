import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/cn";
import type { TransactionFiltersViewModel } from "../../view-models/transactions";
import { Button } from "../ui/button";

interface PaginationProps {
	filters: TransactionFiltersViewModel;
	totalPages: number;
	totalItems: number;
}

export function Pagination({
	filters,
	totalPages,
	totalItems,
}: PaginationProps) {
	const { currentPage, setPage } = filters;

	const pages = generatePageNumbers(currentPage, totalPages);
	const showPageButtons = totalPages > 1;

	return (
		<div className="flex items-center justify-between">
			<p className="text-sm text-text-secondary">
				{totalItems} {totalItems === 1 ? "item" : "itens"}
			</p>

			{showPageButtons && (
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setPage(currentPage - 1)}
						disabled={currentPage <= 1}
						aria-label="Página anterior"
					>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>

					{pages.map((page, index) => (
						<button
							key={page === "..." ? `ellipsis-${index}` : `page-${page}`}
							type="button"
							disabled={page === "..."}
							onClick={() => typeof page === "number" && setPage(page)}
							className={cn(
								"h-10 min-w-10 px-3 text-sm font-medium rounded-md transition-colors",
								page === currentPage
									? "bg-brand text-brand-text"
									: page === "..."
										? "text-text-muted cursor-default"
										: "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
							)}
						>
							{page}
						</button>
					))}

					<Button
						variant="ghost"
						size="icon"
						onClick={() => setPage(currentPage + 1)}
						disabled={currentPage >= totalPages}
						aria-label="Próxima página"
					>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}

function generatePageNumbers(
	current: number,
	total: number,
): (number | "...")[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	if (current <= 3) {
		return [1, 2, 3, 4, 5, "...", total];
	}

	if (current >= total - 2) {
		return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
	}

	return [1, "...", current - 1, current, current + 1, "...", total];
}
