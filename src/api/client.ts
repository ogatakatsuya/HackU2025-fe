import { fetch2 } from "./custom";
import type { CreateDiaryReq } from "./schemas/createDiaryReq";
import type { CreateUserReq } from "./schemas/createUserReq";
import type { Diary } from "./schemas/diary";
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

export const getLogoutUserUrl = () => {
	return "auth/logout/";
};

export const logoutUser = async (options?: RequestInit) => {
	return fetch2(getLogoutUserUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		credentials: "include",
	});
};

export type createDiaryResponse = {
	data: Diary;
	status: number;
	headers: Headers;
};

export const getCreateDiaryUrl = () => {
	return "api/diary/";
};

export const createDiary = async (
	createDiaryReq: CreateDiaryReq,
	options?: RequestInit,
): Promise<createDiaryResponse> => {
	return fetch2<Promise<createDiaryResponse>>(getCreateDiaryUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(createDiaryReq),
	});
};
