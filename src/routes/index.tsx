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
import {
	useTransactionFiltersViewModel,
	useTransactionFormViewModel,
	useTransactionModalViewModel,
	useTransactionsViewModel,
} from "../view-models/transactions";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const filters = useTransactionFiltersViewModel();
	const modal = useTransactionModalViewModel();
	const transactions = useTransactionsViewModel(filters.filters);
	const restoreMutation = useRestoreTransaction();

	const formVm = useTransactionFormViewModel({
		transactionId: modal.editingTransactionId,
		onSuccess: () => {
			modal.closeModal();
			if (modal.isEditModalOpen) {
				toast("🎉 Valor de atualizado", {
					description: "Já pode visualizar na lista.",
				});
			} else {
				toast("🎉 Valor de entrada adicionado", {
					description: "Já pode visualizar na lista.",
				});
			}
		},
	});

	const handleRestore = (id: string) => {
		restoreMutation.mutate(id, {
			onSuccess: () => {
				toast("🎉 Valor restaurado", {
					description: "Já pode visualizar na lista.",
				});
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
							totalItems={transactions.pagination.totalItems}
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
