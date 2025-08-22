import Elysia from "elysia";
import { withAuth } from "./auth";

export const requireAuth = () =>
	new Elysia({ name: "requireAuth" })
		.use(withAuth())
		.onBeforeHandle({ as: "scoped" }, ({ session, user, set }) => {
			if (!session || !user) {
				set.status = 401;
				return { error: "UNAUTHENTICATED" };
			}
		});

export const requireRole = (roles: string[]) =>
	new Elysia({ name: "requireRole" })
		.use(requireAuth)
		.onBeforeHandle({ as: "scoped" }, ({ user, set }) => {
			const { role } = user || {};
			const hasRole = role && roles.includes(role);

			if (!hasRole) {
				set.status = 403;
				return { error: "FORBIDDEN" };
			}
		});
