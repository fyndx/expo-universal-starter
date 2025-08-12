import { createORPCClient } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

const specJSON = await fetch(`${apiUrl}/orpc/spec.json`).then((r) => r.json());

const link = new OpenAPILink(specJSON, {
	url: `${apiUrl}/orpc/`,
});

export const orpc = createORPCClient(link);
