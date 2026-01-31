import type { TransactionType } from "../types/transaction";

export const DEFAULT_TRANSACTION_FORM = {
	type: "income" as TransactionType,
	amount: 0,
} as const;

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

export const TOAST_MESSAGES = {
	transaction: {
		created: {
			title: "🎉 Valor adicionado",
			description: "Já pode visualizar na lista.",
		},
		updated: {
			title: "🎉 Valor atualizado",
			description: "Já pode visualizar na lista.",
		},
		deleted: {
			title: "Valor excluído",
			description: "Pode restaurar em 'Excluídos'.",
		},
		restored: {
			title: "🎉 Valor restaurado",
			description: "Já pode visualizar na lista.",
		},
	},
	error: {
		generic: {
			title: "Erro ao processar",
			description: "Tente novamente mais tarde.",
		},
		load: {
			title: "Erro ao carregar",
			description: "Não foi possível carregar os dados.",
		},
	},
} as const;
