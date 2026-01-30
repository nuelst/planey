import { useNavigate, useSearch } from "@tanstack/react-router";
import type { TransactionType } from "../../types/transaction";

interface FiltersSearchParams {
	type?: TransactionType | "deleted";
	page?: number;
	perPage?: number;
}

const DEFAULT_PER_PAGE = 10;

export function useTransactionFiltersViewModel() {
	const navigate = useNavigate();
	const search = useSearch({ strict: false }) as FiltersSearchParams;

	const currentType = search.type;
	const currentPage = search.page ?? 1;
	const perPage = search.perPage ?? DEFAULT_PER_PAGE;

	const setType = (type?: TransactionType | "deleted") => {
		navigate({
			to: ".",
			search: { ...search, type, page: 1 },
		});
	};

	const setPage = (page: number) => {
		navigate({
			to: ".",
			search: { ...search, page },
		});
	};

	const setPerPage = (newPerPage: number) => {
		navigate({
			to: ".",
			search: { ...search, perPage: newPerPage, page: 1 },
		});
	};

	const clearFilters = () => {
		navigate({
			to: ".",
			search: {},
		});
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
		clearFilters,
		showAll: () => setType(undefined),
		showIncome: () => setType("income"),
		showOutcome: () => setType("outcome"),
		showDeleted: () => setType("deleted"),
	};
}

export type TransactionFiltersViewModel = ReturnType<
	typeof useTransactionFiltersViewModel
>;
