import { fetch2 } from "./custom";
import type { CreateUserReq } from "./schemas/createUserReq";
import type { UserResp } from "./schemas/userResp";

export type createUserResponse = {
	data: UserResp;
	status: number;
	headers: Headers;
};

export const getCreateUserUrl = () => {
	return "auth/registration/";
};

export const createUser = async (
	createUserReq: CreateUserReq,
	options?: RequestInit,
): Promise<createUserResponse> => {
	return fetch2<Promise<createUserResponse>>(getCreateUserUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(createUserReq),
		credentials: "include",
	});
};
