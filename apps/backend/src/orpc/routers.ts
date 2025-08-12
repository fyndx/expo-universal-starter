import { meProcedure } from "./procedures/user/me.p";

export const appRouter = {
	user: {
		me: meProcedure,
	},
};
