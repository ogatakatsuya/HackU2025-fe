import { fetch2 } from "./custom";
import type { CreateUserReq } from "./schemas/createUserReq";
import type { LoginUserReq } from "./schemas/loginUserReq";
import type { User } from "./schemas/user";
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

export type findUserResponse = {
	data: User;
	status: number;
	headers: Headers;
};

export const getFindUserUrl = () => {
	return "auth/user/";
};

export const findUser = async (
	options?: RequestInit,
): Promise<findUserResponse> => {
	return fetch2<Promise<findUserResponse>>(getFindUserUrl(), {
		...options,
		method: "GET",
	});
};

export type loginUserResponse = {
	data: UserResp;
	status: number;
	headers: Headers;
};

export const getLoginUserUrl = () => {
	return "auth/login/";
};

export const loginUser = async (
	loginUserReq: LoginUserReq,
	options?: RequestInit,
): Promise<loginUserResponse> => {
	return fetch2<Promise<loginUserResponse>>(getLoginUserUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(loginUserReq),
		credentials: "include",
	});
};
