import { baseMiddleware } from "@/src/orpc/middleware";
import { z } from "zod";

export const healthProcedure = baseMiddleware
	.route({ method: "GET", path: "/health" })
	.output(
		z.object({
			status: z.literal("ok"),
			timestamp: z.string(),
		}),
	)
	.handler(() => {
		return {
			status: "ok" as const,
			timestamp: new Date().toISOString(),
		};
	});
