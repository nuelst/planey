import { useSearchParamsNavigation } from "../../hooks";
import type { SearchParams } from "../../lib/search-params";

export function useTransactionModalViewModel() {
	const { search, updateSearch, removeSearchParams } =
		useSearchParamsNavigation<SearchParams>();

	const isCreateModalOpen = search.modal === "create";
	const isEditModalOpen = search.modal === "edit" && !!search.transactionId;
	const isModalOpen = isCreateModalOpen || isEditModalOpen;
	const editingTransactionId = search.transactionId;

	const openCreateModal = () => {
		updateSearch({ modal: "create", transactionId: undefined });
	};

	const openEditModal = (transactionId: string) => {
		updateSearch({ modal: "edit", transactionId });
	};

	const closeModal = () => {
		removeSearchParams("modal", "transactionId");
	};

	return {
		isModalOpen,
		isCreateModalOpen,
		isEditModalOpen,
		editingTransactionId,

		openCreateModal,
		openEditModal,
		closeModal,
	};
}

export type TransactionModalViewModel = ReturnType<
	typeof useTransactionModalViewModel
>;
