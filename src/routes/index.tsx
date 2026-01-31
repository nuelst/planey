import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Header } from "../components/layout";
import {
	FilterButtons,
	Pagination,
	TransactionList,
	TransactionModal,
} from "../components/transactions";
import { useRestoreTransaction } from "../hooks/transactions";
import { TOAST_MESSAGES } from "../lib/constants";
import { searchParamsSchema } from "../lib/search-params";
import {
	useTransactionFiltersViewModel,
	useTransactionFormViewModel,
	useTransactionModalViewModel,
	useTransactionsViewModel,
} from "../view-models/transactions";

export const Route = createFileRoute("/")({
	validateSearch: searchParamsSchema,
	component: App,
});

function App() {
	const filters = useTransactionFiltersViewModel();
	const modal = useTransactionModalViewModel();
	const transactions = useTransactionsViewModel(filters.filters);
	const restoreMutation = useRestoreTransaction();

	const formVm = useTransactionFormViewModel({
		transactionId: modal.editingTransactionId,
		onSuccess: () => {
			modal.closeModal();
			const message = modal.isEditModalOpen
				? TOAST_MESSAGES.transaction.updated
				: TOAST_MESSAGES.transaction.created;
			toast(message.title, { description: message.description });
		},
	});

	const handleRestore = (id: string) => {
		restoreMutation.mutate(id, {
			onSuccess: () => {
				const { title, description } = TOAST_MESSAGES.transaction.restored;
				toast(title, { description });
			},
		});
	};

	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-[552px] px-4">
				<Header onNewTransaction={modal.openCreateModal} />

				<div className="mt-[60px] space-y-5">
					<FilterButtons filters={filters} />

					<TransactionList
						vm={transactions}
						onItemClick={modal.openEditModal}
						onRestore={handleRestore}
					/>

					{transactions.pagination.totalItems > 0 && (
						<Pagination
							filters={filters}
							totalPages={transactions.pagination.totalPages}
						/>
					)}
				</div>
			</div>

			<TransactionModal
				isOpen={modal.isModalOpen}
				onClose={modal.closeModal}
				formVm={formVm}
			/>
		</main>
	);
}
