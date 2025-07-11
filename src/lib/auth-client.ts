import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const plugins = [];

if (process.env.EXPO_OS !== "web") {
	plugins.push(
		expoClient({
			scheme: "universalstarter",
			storagePrefix: "universal-starter",
			storage: SecureStore,
		}),
	);
}

export const authClient = createAuthClient({
	baseURL: "https://ship-server.onrender.com/api/auth", // Base URL of your Better Auth backend.
	plugins: plugins,
	fetchOptions: {
		credentials: "include", // Include cookies in requests.
		mode: "cors", // Use CORS mode for cross-origin requests.
	},
});
