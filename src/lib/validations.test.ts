import { describe, expect, it } from "vitest";
import { transactionSchema } from "./validations";

describe("transactionSchema", () => {
	it("deve aceitar transação válida", () => {
		const result = transactionSchema.safeParse({
			type: "income",
			amount: 100,
		});
		expect(result.success).toBe(true);
	});

	it("deve rejeitar valor zero", () => {
		const result = transactionSchema.safeParse({
			type: "income",
			amount: 0,
		});
		expect(result.success).toBe(false);
	});

	it("deve rejeitar tipo inválido", () => {
		const result = transactionSchema.safeParse({
			type: "invalid",
			amount: 100,
		});
		expect(result.success).toBe(false);
	});
});
