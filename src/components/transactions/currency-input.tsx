import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/cn";

interface CurrencyInputProps {
	value: number;
	onChange: (value: number) => void;
	hasError?: boolean;
}

export function CurrencyInput({
	value,
	onChange,
	hasError,
}: CurrencyInputProps) {
	const [displayValue, setDisplayValue] = useState("");

	// Formata o valor inicial
	useEffect(() => {
		if (value === 0) {
			setDisplayValue("0,00");
		} else {
			setDisplayValue(formatCurrency(value));
		}
	}, [value]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value;

			// Remove tudo que não é número
			const numbers = rawValue.replace(/\D/g, "");

			if (numbers === "") {
				setDisplayValue("0,00");
				onChange(0);
				return;
			}

			// Converte para número (centavos)
			const numericValue = Number.parseInt(numbers, 10) / 100;

			// Formata para exibição
			setDisplayValue(formatCurrency(numericValue));

			// Passa o valor numérico para o form
			onChange(numericValue);
		},
		[onChange],
	);

	return (
		<input
			type="text"
			inputMode="numeric"
			value={displayValue}
			onChange={handleChange}
			className={cn(
				"w-full bg-transparent text-4xl font-medium outline-none",
				hasError ? "text-outcome" : "text-text-primary",
			)}
			placeholder="0,00"
		/>
	);
}

function formatCurrency(value: number): string {
	return value.toLocaleString("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}
