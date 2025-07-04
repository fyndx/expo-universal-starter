import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
 
export const authClient = createAuthClient({
    baseURL: "https://ship-server.onrender.com/api/auth", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "universalstarter",
            storagePrefix: "universal-starter",
            storage: SecureStore,
        })
    ]
});