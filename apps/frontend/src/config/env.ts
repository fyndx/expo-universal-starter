import { z } from "zod";

const envSchema = z.object({
	EXPO_PUBLIC_API_URL: z.url(),
	EXPO_PUBLIC_STORAGE_PREFIX: z.string().min(2).max(100),
});

export const env = envSchema.parse(process.env);
