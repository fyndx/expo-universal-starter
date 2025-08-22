import { requireAuth } from "@/src/plugins/auth-guards";
import Elysia from "elysia";

export const meRoutes = new Elysia({ prefix: "/me" })
	.use(requireAuth())
	.get("/", ({ user }) => {
		console.log("user at /me:", user);
		return { user };
	});
