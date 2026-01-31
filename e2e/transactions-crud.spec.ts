import { expect, test } from "@playwright/test";

test.describe("Transacoes - CRUD", () => {
	test("deve criar uma transacao de entrada", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		await page.click("header button");
		await expect(
			page.locator("text=Quanto você quer adicionar?"),
		).toBeVisible();

		await page.fill('input[inputmode="numeric"]', "10000");

		await page.locator('[role="dialog"] button:has-text("Entrada")').click();

		await page.click('button[type="submit"]');

		await expect(page.locator("text=🎉")).toBeVisible();
	});

	test("deve criar uma transacao de saida", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		await page.click("header button");
		await page.fill('input[inputmode="numeric"]', "5000");

		await page.locator('[role="dialog"] button:has-text("Saída")').click();

		await page.click('button[type="submit"]');

		await expect(page.locator("text=🎉")).toBeVisible();
	});

	test("deve editar uma transacao ao clicar no item", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		const firstItem = page.locator("button:has-text('R$')").first();

		if (await firstItem.isVisible()) {
			await firstItem.click();

			await expect(page.locator('[role="dialog"]')).toBeVisible();
			await expect(page).toHaveURL(/modal=edit/);
		}
	});

	test("deve excluir uma transacao", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		const deleteButton = page
			.locator('button[aria-label="Excluir transação"]')
			.first();

		if (await deleteButton.isVisible()) {
			await deleteButton.click();
			await page.waitForTimeout(1000);
		}
	});

	test("deve restaurar uma transacao excluida", async ({ page }) => {
		await page.goto("/?deleted=true");
		await page.waitForLoadState("networkidle");

		const restoreButton = page.locator("button:has-text('Restaurar')").first();

		if (await restoreButton.isVisible()) {
			await restoreButton.click();
			await expect(page.locator("text=🎉")).toBeVisible();
		}
	});
});

