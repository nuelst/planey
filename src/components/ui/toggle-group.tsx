import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const toggleGroupVariants = cva(
	"inline-flex items-center rounded-md bg-surface border border-border p-1 gap-1",
);

const toggleItemVariants = cva(
	"inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
	{
		variants: {
			active: {
				true: "bg-surface-active text-text-primary",
				false:
					"bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover",
			},
		},
		defaultVariants: {
			active: false,
		},
	},
);

interface ToggleGroupProps {
	children: ReactNode;
	className?: string;
}

export function ToggleGroup({ children, className }: ToggleGroupProps) {
	return <div className={toggleGroupVariants({ className })}>{children}</div>;
}

interface ToggleItemProps extends VariantProps<typeof toggleItemVariants> {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}

export function ToggleItem({
	children,
	active,
	onClick,
	className,
}: ToggleItemProps) {
	return (
		<button
			type="button"
			className={toggleItemVariants({ active, className })}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
