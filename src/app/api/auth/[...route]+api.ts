import { auth } from "@/src/server/auth";

export const GET = (request: Request) => {
	return auth.handler(request);
};

export const POST = (request: Request) => {
	return auth.handler(request);
};