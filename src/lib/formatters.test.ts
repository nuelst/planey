import { describe, expect, it } from "vitest";
import { formatCurrency, fromCents, toCents } from "./formatters";

describe("formatCurrency", () => {
	it("deve formatar valor em centavos para moeda brasileira (R$)", () => {
		const result = formatCurrency(125000);
		expect(result).toContain("R$");
		expect(result).toContain("1.250,00");
	});
});

describe("toCents", () => {
	it("deve converter valor decimal para centavos", () => {
		expect(toCents(12.5)).toBe(1250);
	});
});

describe("fromCents", () => {
	it("deve converter centavos para valor decimal", () => {
		expect(fromCents(1250)).toBe(12.5);
	});
});
