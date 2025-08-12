import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { baseMiddleware } from "../../middleware";
import { requireAuth } from "../../middleware/auth.middleware";

export const meProcedure = baseMiddleware
	.use(requireAuth)
	.route({ method: "GET", path: "/user/me" })
	.output(
		z.object({
			id: z.string(),
			email: z.string(),
			name: z.string().nullable(),
		}),
	)
	.handler(({ context }) => {
		const { user } = context;
		if (!user) {
			// Should be unreachable because of requireAuth, but keeps types narrow
			throw new ORPCError("UNAUTHORIZED", { message: "Unauthenticated" });
		}
		return {
			id: user.id,
			email: user.email,
			name: user.name ?? null,
		};
	});
