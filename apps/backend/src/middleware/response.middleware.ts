import type ElysiaApp from "elysia";
import type { ErrorResponse, SuccessResponse } from "../schemas/response";

export const isJsonString = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const useSuccessResponseMiddleware = (app: ElysiaApp) => {
	return app.onAfterHandle(async (context): Promise<SuccessResponse> => {
		const path = context.request.url;
		const message = "success";
		const response = context.response;
		const timeStamp = new Date().toISOString();
		const status = context.set.status ?? 200;

		console.log("success", response);

		return {
			path,
			message,
			data: response,
			timeStamp,
			status,
		};
	});
};

export const useErrorMiddleware = (app: ElysiaApp) => {
	return app.onError(async (context): Promise<ErrorResponse> => {
		const path = context.request.url;

		const message = isJsonString(context.error.message)
			? JSON.parse(context.error.message)
			: context.error.message;
		const data = null;
		const timeStamp = new Date().toISOString();
		const status = context.set.status ?? context.error.status ?? 500;

		// NOTE : You can put your error logging here

		return {
			path,
			message,
			data,
			timeStamp,
			status,
			code: context.code,
		};
	});
};
