import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/cn";

interface CurrencyInputProps {
	value: number;
	onChange: (value: number) => void;
	hasError?: boolean;
	variant?: "income" | "outcome";
}

export function CurrencyInput({
	value,
	onChange,
	hasError,
	variant = "income",
}: CurrencyInputProps) {
	const [displayValue, setDisplayValue] = useState("");

	// Formata o valor inicial
	useEffect(() => {
		if (value === 0) {
			setDisplayValue("0.00");
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
				setDisplayValue("0.00");
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

	const textColor = hasError
		? "text-error"
		: variant === "outcome"
			? "text-outcome"
			: "text-text-primary";

	return (
		<input
			type="text"
			inputMode="numeric"
			value={displayValue}
			onChange={handleChange}
			className={cn(
				"w-full bg-transparent text-[24px] font-normal outline-none",
				textColor,
			)}
			placeholder="0.00"
		/>
	);
}

function formatCurrency(value: number): string {
	return value.toFixed(2);
}
