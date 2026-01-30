import { useNavigate, useSearch } from "@tanstack/react-router";

interface ModalSearchParams {
	modal?: "create" | "edit";
	transactionId?: string;
}

export function useTransactionModalViewModel() {
	const navigate = useNavigate();
	const search = useSearch({ strict: false }) as ModalSearchParams;

	const isCreateModalOpen = search.modal === "create";
	const isEditModalOpen = search.modal === "edit" && !!search.transactionId;
	const isModalOpen = isCreateModalOpen || isEditModalOpen;
	const editingTransactionId = search.transactionId;

	const openCreateModal = () => {
		navigate({
			to: ".",
			search: { ...search, modal: "create" },
		});
	};

	const openEditModal = (transactionId: string) => {
		navigate({
			to: ".",
			search: { ...search, modal: "edit", transactionId },
		});
	};

	const closeModal = () => {
		const { modal: _, transactionId: __, ...rest } = search;
		navigate({
			to: ".",
			search: rest,
		});
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
