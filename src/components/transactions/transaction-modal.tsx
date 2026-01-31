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
	const { form, handleSubmit, isSubmitting, errors } = formVm;

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleSubmit(e);
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-[12px] animate-in fade-in" />
				<Dialog.Content
					className={cn(
						"fixed left-1/2 top-10 -translate-x-1/2",
						"w-full max-w-[552px] p-6 rounded-[16px]",
						"bg-dialog-bg border border-dialog-border",
						"animate-in fade-in zoom-in-95",
						"focus:outline-none",
					)}
				>
					{/* Close button - top right */}
					<Dialog.Close asChild>
						<button
							type="button"
							className="absolute top-6 right-6 p-2 rounded-full bg-toggle-bg text-text-secondary hover:text-text-primary transition-colors"
							aria-label="Fechar"
						>
							<Cross2Icon className="h-[10px] w-[10px]" />
						</button>
					</Dialog.Close>

					<form onSubmit={onSubmit} className="flex flex-col gap-6">
						{/* Campo de valor */}
						<div className="flex flex-col gap-3">
							<Dialog.Title className="text-[14px] font-normal text-text-secondary">
								{form.watch("amount") > 0
									? "Valor"
									: "Quanto você quer adicionar?"}
							</Dialog.Title>
							<Controller
								name="amount"
								control={form.control}
								render={({ field }) => (
									<CurrencyInput
										value={field.value}
										onChange={field.onChange}
										hasError={!!errors.amount}
										variant={form.watch("type")}
									/>
								)}
							/>
							{errors.amount && (
								<p className="text-[14px] text-error">
									{errors.amount.message}
								</p>
							)}
						</div>

						{/* Toggle + Button row */}
						<div className="flex items-center justify-between">
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
							<Button type="submit" variant="brand" isLoading={isSubmitting}>
								{form.watch("amount") > 0 ? "Salvar alterações" : "Adicionar"}
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
