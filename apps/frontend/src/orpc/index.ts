import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { AppRouter } from "@universal/orpc-client";
import { env } from "~/config/env";

const link = new RPCLink({
	url: env.EXPO_PUBLIC_API_URL,
});

export const orpc: RouterClient<AppRouter> = createORPCClient(link);
