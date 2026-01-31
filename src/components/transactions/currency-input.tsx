import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { formatCurrencyValue } from "../../lib/formatters";

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

	useEffect(() => {
		setDisplayValue(formatCurrencyValue(value));
	}, [value]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value;
			const numbers = rawValue.replace(/\D/g, "");

			if (numbers === "") {
				setDisplayValue(formatCurrencyValue(0));
				onChange(0);
				return;
			}

			const numericValue = Number.parseInt(numbers, 10) / 100;
			setDisplayValue(formatCurrencyValue(numericValue));
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
			placeholder="R$ 0,00"
		/>
	);
}
