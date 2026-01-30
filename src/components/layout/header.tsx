import { Button } from "../ui/button";

interface HeaderProps {
	onNewTransaction: () => void;
}

export function Header({ onNewTransaction }: HeaderProps) {
	return (
		<header className="flex items-center justify-between py-6">
			<img src="/planey.svg" alt="Planey" className="h-6" />
			<Button variant="brand" onClick={onNewTransaction}>
				Novo valor
			</Button>
		</header>
	);
}
