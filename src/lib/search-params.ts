import { z } from "zod";

export const searchParamsSchema = z.object({
	modal: z.enum(["create", "edit"]).optional().catch(undefined),
	transactionId: z.string().optional().catch(undefined),

	type: z.enum(["income", "outcome", "deleted"]).optional().catch(undefined),
	page: z.coerce.number().positive().optional().catch(undefined),
	perPage: z.coerce.number().positive().optional().catch(undefined),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;
