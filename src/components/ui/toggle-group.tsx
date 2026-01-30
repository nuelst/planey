import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const toggleGroupVariants = cva(
	"inline-flex items-center rounded-full bg-toggle-bg px-[7px] py-2 gap-[10px]",
);

const toggleItemVariants = cva(
	"inline-flex items-center justify-center h-6 px-3 py-[2px] text-[14px] rounded-[19px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
	{
		variants: {
			active: {
				true: "bg-toggle-active text-white font-medium",
				false: "bg-transparent text-white font-normal hover:bg-surface-hover",
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
