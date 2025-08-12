import { createORPCClient } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
	throw new Error(
		"EXPO_PUBLIC_API_URL is not set. Please configure the API URL in your environment variables.",
	);
}

const specJSON = await fetch(`${apiUrl}/orpc/spec.json`).then((r) => r.json());

const link = new OpenAPILink(specJSON, {
	url: `${apiUrl}/orpc/`,
});

export const orpc = createORPCClient(link);
