import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { appRouter } from "./routers";

export const openAPIHandler = new OpenAPIHandler(appRouter, {
	interceptors: [],
	plugins: [
		new CORSPlugin({
			origin: (origin, options) => origin ?? "*",
			allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
			allowHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		}),
		new SmartCoercionPlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
			specGenerateOptions: {
				info: {
					title: "ORPC Playground",
					version: "1.0.0",
				},
				components: {
					securitySchemes: {
						bearerAuth: {
							type: "http",
							scheme: "bearer",
						},
					},
				},
			},
		}),
	],
});

export const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [],
});
