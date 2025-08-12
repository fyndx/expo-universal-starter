import { os } from "@orpc/server";
import { withBetterAuth } from "./auth.middleware";
import { dbProviderMiddleware } from "./db.middleware";

export const baseMiddleware = os
	.$context<{ headers: Headers | Record<string, string> }>()
	.use(dbProviderMiddleware)
	.use(withBetterAuth);
