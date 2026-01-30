import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z.url("URL da API inválida"),
});

function parseEnv() {
	const parsed = envSchema.safeParse({
		VITE_API_URL: import.meta.env.VITE_API_URL,
	});

	if (!parsed.success) {
		console.error("❌ Variáveis de ambiente inválidas:", parsed.error.format());
		throw new Error("Variáveis de ambiente inválidas");
	}

	return parsed.data;
}

export const env = parseEnv();
