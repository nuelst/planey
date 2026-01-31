export function formatCurrency(valueInCents: number): string {
	return formatBRL(valueInCents / 100);
}

export function formatCurrencyValue(value: number): string {
	return formatBRL(value);
}

function formatBRL(value: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}

export function toCents(value: number): number {
	return Math.round(value * 100);
}

export function fromCents(cents: number): number {
	return cents / 100;
}

export function formatDate(dateString: string): string {
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date(dateString));
}

export function formatDateTime(dateString: string): string {
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(dateString));
}
