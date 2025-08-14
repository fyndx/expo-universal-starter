import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { AppRouter } from "@universal/orpc-client";

const link = new RPCLink({
	url: process.env.EXPO_PUBLIC_API_URL as string,
});

export const orpc: RouterClient<AppRouter> = createORPCClient(link);
