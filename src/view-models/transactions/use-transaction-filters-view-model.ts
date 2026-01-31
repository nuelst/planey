import { useSearchParamsNavigation } from "../../hooks";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../lib/constants";
import type { SearchParams } from "../../lib/search-params";
import type { TransactionType } from "../../types/transaction";

export function useTransactionFiltersViewModel() {
	const { search, updateSearch, clearSearch } =
		useSearchParamsNavigation<SearchParams>();

	const currentType = search.type;
	const currentPage = search.page ?? DEFAULT_PAGE;
	const perPage = search.perPage ?? DEFAULT_PER_PAGE;

	const setType = (type?: TransactionType | "deleted") => {
		updateSearch({ type, page: DEFAULT_PAGE });
	};

	const setPage = (page: number) => {
		updateSearch({ page });
	};

	const setPerPage = (newPerPage: number) => {
		updateSearch({ perPage: newPerPage, page: DEFAULT_PAGE });
	};

	const filters = {
		type: currentType,
		page: currentPage,
		perPage,
	};

	return {
		filters,
		currentType,
		currentPage,
		perPage,

		isFiltering: !!currentType,
		isShowingAll: !currentType,
		isShowingIncome: currentType === "income",
		isShowingOutcome: currentType === "outcome",
		isShowingDeleted: currentType === "deleted",

		setType,
		setPage,
		setPerPage,
		clearFilters: clearSearch,
		showAll: () => setType(undefined),
		showIncome: () => setType("income"),
		showOutcome: () => setType("outcome"),
		showDeleted: () => setType("deleted"),
	};
}

export type TransactionFiltersViewModel = ReturnType<
	typeof useTransactionFiltersViewModel
>;
