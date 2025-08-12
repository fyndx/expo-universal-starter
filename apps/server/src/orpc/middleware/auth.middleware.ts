import { ORPCError, os } from "@orpc/server";
import { auth } from "@/src/lib/auth";

type BAUser = typeof auth.$Infer.Session.user | null;
type BASession = typeof auth.$Infer.Session.session | null;

export type InputCtx = {
	// initial context must provide request headers
	headers: Headers | Record<string, string>;
};

export type AuthCtx = InputCtx & {
	// injected by middleware
	user: BAUser;
	session: BASession;
};

export const withBetterAuth = os
	.$context<InputCtx>()
	.middleware(async ({ context, next }) => {
		const headers =
			context.headers instanceof Headers
				? context.headers
				: new Headers(context.headers);

		// Server-side Better Auth API (no client in middlewares)
		const sessionData = await auth.api.getSession({ headers }); // server API call

		return next({
			context: {
				// preserve existing context and inject auth data
				...context,
				session: sessionData?.session || null,
				user: sessionData?.user || null,
			},
		});
	});

export const requireAuth = os
	.$context<AuthCtx>()
	.middleware(async ({ context, next }) => {
		if (!context.session || !context.user) {
			throw new ORPCError("UNAUTHORIZED", { message: "Unauthenticated" });
		}
		return next({ context });
	});

export const requireRole = (roles: string[]) =>
	os.$context<AuthCtx>().middleware(async ({ context, next }) => {
		const rolesValue = (context.user as unknown as { roles?: unknown })?.roles;
		const userRoles: string[] = Array.isArray(rolesValue)
			? (rolesValue as string[])
			: [];
		if (!roles.some((r) => userRoles.includes(r))) {
			throw new ORPCError("FORBIDDEN", { message: "Forbidden" });
		}
		return next({ context });
	});
