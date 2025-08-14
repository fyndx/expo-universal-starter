import { healthProcedure } from "./procedures/public/health.p";
import { meProcedure } from "./procedures/user/me.p";

export const appRouter = {
	user: {
		me: meProcedure,
	},
	public: {
		health: healthProcedure,
	},
};

export type AppRouter = typeof appRouter;
