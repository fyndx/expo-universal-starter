import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
// import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { appRouter } from "./routers";

export const orpcHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		// new CORSPlugin({
		// 	origin: (origin, options) => origin,
		// 	allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
		// }),
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
