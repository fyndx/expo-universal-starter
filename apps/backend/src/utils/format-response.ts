import { type TSchema, t } from "elysia";

export const formatResponseSchema = <SCHEMA extends TSchema>(
	responseSchema: SCHEMA,
) => {
	return t.Object({
		path: t.String(),
		message: t.Optional(t.String()),
		data: responseSchema,
		// status: t.Union([t.Number(), t.String()]),
		timeStamp: t.String(),
	});
};
