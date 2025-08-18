import { os } from "@orpc/server";
import { requireAuth, withAuthSession } from "./auth.middleware";
import { dbProviderMiddleware } from "./db.middleware";

export const baseMiddleware = os
	.$context<{ headers: Headers | Record<string, string> }>()
	.use(dbProviderMiddleware);

export const publicMiddleware = baseMiddleware.use(withAuthSession);

export const protectedMiddleware = publicMiddleware.use(requireAuth);
