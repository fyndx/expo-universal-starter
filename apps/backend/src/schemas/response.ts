import { type Static, t } from "elysia";

const BaseResponseSchema = t.Object({
	path: t.String(),
	message: t.String(),
	timeStamp: t.String(),
});

export const SuccessResponseSchema = t.Composite([
	BaseResponseSchema,
	t.Object({
		data: t.Any(),
		status: t.Union([t.Number(), t.String()]),
	}),
]);

export type SuccessResponse = Static<typeof SuccessResponseSchema>;

export const ErrorResponseSchema = t.Composite([
	BaseResponseSchema,
	t.Object({
		data: t.Null(),
		status: t.Number(),
		code: t.String(),
		message: t.String(),
	}),
]);

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
