import { fetch2 } from "./custom";
import type { CreateDiaryReq } from "./schemas/createDiaryReq";
import type { CreateUserReq } from "./schemas/createUserReq";
import type { Diary } from "./schemas/diary";
import type { LoginUserReq } from "./schemas/loginUserReq";
import type { UpdateDiaryReq } from "./schemas/updateDiaryReq";
import type { User } from "./schemas/user";
import type { UserResp } from "./schemas/userResp";
import type { CreateSchedulesReq } from "./schemas/createSchedulesReq";
import type { Schedule } from "./schemas/schedule";
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
		headers: { ...options?.headers },
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

export type createSchedulesResponse = {
	data: Schedule[];
	status: number;
	headers: Headers;
};
export const getCreateDiaryUrl = () => {
	return "api/diary/";
};
export const getCreateScheduleUrl = () => {
	return "api/schedule/";
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

export const createSchedules = async (
	createScheduleReq: CreateSchedulesReq,
	options?: RequestInit,
): Promise<createSchedulesResponse> => {
	return fetch2<Promise<createSchedulesResponse>>(getCreateScheduleUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(createScheduleReq),
	});
};

export type findDiariesResponse = {
	data: Diary[];
	status: number;
	headers: Headers;
};

export const getFindDiariesUrl = () => {
	return "api/diary/";
};

export const findDiaries = async (
	date?: string,
	options?: RequestInit,
): Promise<findDiariesResponse> => {
	return fetch2<Promise<findDiariesResponse>>(
		getFindDiariesUrl() + (date && `${date}/`),
		{
			...options,
			method: "GET",
			headers: { ...options?.headers },
		},
	);
};

export type updateDiaryResponse = {
	data: Diary;
	status: number;
	headers: Headers;
};

export const getUpdateDiaryUrl = () => {
	return "api/diary/";
};

export const updateDiary = async (
	updateDiaryReq: UpdateDiaryReq,
	options?: RequestInit,
): Promise<updateDiaryResponse> => {
	return fetch2<Promise<updateDiaryResponse>>(
		`${getUpdateDiaryUrl()}${updateDiaryReq.id}/`,
		{
			...options,
			method: "PATCH",
			headers: { "Content-Type": "application/json", ...options?.headers },
			body: JSON.stringify(updateDiaryReq),
		},
	);
};

export type deleteDiaryResponse = {
	status: number;
	headers: Headers;
};

export const getDeleteDiaryUrl = () => {
	return "api/diary/";
};

export const deleteDiary = async (
	diary_id: string,
	options?: RequestInit,
): Promise<deleteDiaryResponse> => {
	return fetch2<Promise<deleteDiaryResponse>>(
		`${getDeleteDiaryUrl()}${diary_id}/`,
		{
			...options,
			method: "DELETE",
			headers: { ...options?.headers },
		},
	);
};
