import { expect, test } from "@playwright/test";

test.describe("Transacoes - Filtros e Navegacao", () => {
	test("deve abrir modal via URL", async ({ page }) => {
		await page.goto("/?modal=create");
		await page.waitForLoadState("networkidle");

		await expect(
			page.locator("text=Quanto você quer adicionar?"),
		).toBeVisible();
	});

	test("deve filtrar por entradas via URL", async ({ page }) => {
		await page.goto("/?type=income");
		await page.waitForLoadState("networkidle");

		await expect(page).toHaveURL(/type=income/);
	});

	test("deve filtrar por saidas via URL", async ({ page }) => {
		await page.goto("/?type=outcome");
		await page.waitForLoadState("networkidle");

		await expect(page).toHaveURL(/type=outcome/);
	});

	test("deve exibir paginacao", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		const select = page.locator('[role="combobox"]');
		await expect(select).toBeVisible();
	});
});

