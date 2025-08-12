import { os } from "@orpc/server";
import { prisma } from "@/src/lib/db";

export const dbProviderMiddleware = os
	.$context<{
		db?: typeof prisma;
	}>()
	.middleware(async ({ context, next }) => {
		const db = context.db ?? prisma;

		return next({
			context: {
				// preserve existing context while injecting db
				...context,
				db,
			},
		});
	});
