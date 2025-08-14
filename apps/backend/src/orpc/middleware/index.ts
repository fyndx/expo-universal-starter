// export const baseMiddleware = os
// 	.$context<{ headers: Headers | Record<string, string> }>()
// 	.use(dbProviderMiddleware)
// 	.use(withAuthSession);

export { requireAuth } from "./auth.middleware";
export {
	baseMiddleware,
	protectedMiddleware,
	publicMiddleware,
} from "./base.middleware";

export { dbProviderMiddleware } from "./db.middleware";
