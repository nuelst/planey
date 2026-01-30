import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";
import { cn } from "../../lib/cn";
import type { TransactionFormViewModel } from "../../view-models/transactions";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleItem } from "../ui/toggle-group";
import { CurrencyInput } from "./currency-input";

interface TransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	formVm: TransactionFormViewModel;
}

export function TransactionModal({
	isOpen,
	onClose,
	formVm,
}: TransactionModalProps) {
	const { form, handleSubmit, isEditing, isSubmitting, errors } = formVm;

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleSubmit(e);
		onClose();
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" />
				<Dialog.Content
					className={cn(
						"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
						"w-full max-w-md p-6 rounded-xl",
						"bg-surface border border-border",
						"animate-in fade-in zoom-in-95",
						"focus:outline-none",
					)}
				>
					<div className="flex items-center justify-between mb-6">
						<Dialog.Title className="text-lg font-medium text-text-primary">
							{isEditing ? "Valor" : "Quanto você quer adicionar?"}
						</Dialog.Title>
						<Dialog.Close asChild>
							<button
								type="button"
								className="text-text-secondary hover:text-text-primary transition-colors"
								aria-label="Fechar"
							>
								<Cross2Icon className="h-5 w-5" />
							</button>
						</Dialog.Close>
					</div>

					<form onSubmit={onSubmit}>
						<div className="space-y-6">
							{/* Campo de valor */}
							<div>
								<Controller
									name="amount"
									control={form.control}
									render={({ field }) => (
										<CurrencyInput
											value={field.value}
											onChange={field.onChange}
											hasError={!!errors.amount}
										/>
									)}
								/>
								{errors.amount && (
									<p className="mt-2 text-sm text-outcome">
										{errors.amount.message}
									</p>
								)}
							</div>

							{/* Toggle Entrada/Saída */}
							<Controller
								name="type"
								control={form.control}
								render={({ field }) => (
									<ToggleGroup>
										<ToggleItem
											active={field.value === "income"}
											onClick={() => field.onChange("income")}
										>
											Entrada
										</ToggleItem>
										<ToggleItem
											active={field.value === "outcome"}
											onClick={() => field.onChange("outcome")}
										>
											Saída
										</ToggleItem>
									</ToggleGroup>
								)}
							/>

							{/* Botão de submit */}
							<div className="flex justify-end">
								<Button type="submit" variant="brand" isLoading={isSubmitting}>
									{isEditing ? "Salvar alterações" : "Adicionar"}
								</Button>
							</div>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
