import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				brand:
					"bg-brand text-brand-text border border-brand-border hover:bg-brand-hover",
				outline:
					"bg-surface text-text-primary border border-border hover:border-border-hover hover:bg-surface-hover",
				ghost: "bg-transparent text-text-primary hover:bg-surface-hover",
				destructive:
					"bg-destructive-bg text-outcome border border-destructive-border hover:bg-surface-hover",
				icon: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover",
			},
			size: {
				sm: "h-8 px-3 text-sm rounded-md",
				md: "h-10 px-4 text-base rounded-md",
				lg: "h-12 px-6 text-lg rounded-md",
				icon: "h-10 w-10 rounded-md",
			},
		},
		defaultVariants: {
			variant: "brand",
			size: "md",
		},
	},
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	children?: ReactNode;
	isLoading?: boolean;
}

export function Button({
	className,
	variant,
	size,
	children,
	isLoading,
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			className={buttonVariants({ variant, size, className })}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<svg
					className="h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			) : null}
			{children}
		</button>
	);
}

export { buttonVariants };
