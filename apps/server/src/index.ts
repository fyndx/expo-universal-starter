import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { auth } from "@/src/lib/auth";
import { isOriginAllowed } from "./cors";
import { OpenAPI } from "./lib/open-api";
import { orpcHandler } from "./orpc";

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
				tags: [{ name: "App", description: "General endpoints" }],
			},
		}),
	)
	.use(
		cors({
			origin: (request: Request) => {
				// const ALLOWED_ORIGINS = [
				// 	"http://localhost:8081",
				// 	// /^https:\/\/.*\.expo\.app$/,
				// 	"https://*.expo.app",
				// ];

				const origin = request.headers.get("origin") || "";
				return isOriginAllowed(origin);
			},
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.mount(auth.handler)
	.get("/", () => "Hello Elysia", {
		detail: {
			tags: ["App"],
		},
	})
	.get(
		"/health",
		() => {
			return {
				uptime: process.uptime(),
				message: "OK",
				timestamp: Date.now(),
			};
		},
		{
			detail: {
				tags: ["App"],
				description: "Health check endpoint",
				summary: "Health Check",
			},
		},
	)
	// Orpc
	.all(
		"/orpc/*",
		async ({ request }: { request: Request }) => {
			const { response } = await orpcHandler.handle(request, {
				prefix: "/orpc",
				context: {
					headers: request.headers,
				},
			});

			return response ?? new Response("Not Found", { status: 404 });
		},
		{
			parse: "none",
		},
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
