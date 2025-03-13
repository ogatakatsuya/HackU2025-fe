import dayjs from "dayjs";
import { fetch2 } from "./custom";
import type { Chat } from "./schemas/chat";
import type { CreateChatReq } from "./schemas/createChatReq";
import type { CreateDiaryReq } from "./schemas/createDiaryReq";
import type { CreateSchedulesReq } from "./schemas/createSchedulesReq";
import type { CreateSectionReq } from "./schemas/createSectionReq";
import type { CreateUserReq } from "./schemas/createUserReq";
import type { Diary } from "./schemas/diary";
import type { GenerateImageReq } from "./schemas/generateImageReq";
import type { ImageResp } from "./schemas/imageResp";
import type { LoginUserReq } from "./schemas/loginUserReq";
import type { Schedule } from "./schemas/schedule";
import type { Section } from "./schemas/section";
import type { UpdateDiaryReq } from "./schemas/updateDiaryReq";
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

export type createSchedulesResponse = {
	data: Schedule[];
	status: number;
	headers: Headers;
};
export const getCreateScheduleUrl = () => {
	return "api/schedule/";
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

export type findSchedulesResponse = {
	data: Schedule[];
	status: number;
	headers: Headers;
};
export const getFindSchedulesUrl = () => {
	return "api/schedule/";
};
export const findSchedules = async (
	date: string,
	options?: RequestInit,
): Promise<findSchedulesResponse> => {
	const parsedDate = dayjs(date);
	const year = parsedDate.format("YYYY");
	const month = parsedDate.format("MM");
	const day = parsedDate.format("DD");
	const url = `${getFindSchedulesUrl()}?month=${month}&year=${year}&day=${day}`;
	return fetch2<Promise<findDiariesResponse>>(url, {
		...options,
		method: "GET",
		headers: { ...options?.headers },
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

export type imageGenerateResponse = {
	status: number;
	headers: Headers;
	data: ImageResp;
};

export const getGenerateImageUrl = () => {
	return "api/gen_image/";
};

export const generateDiaryImage = async (
	generateImageReq: GenerateImageReq,
	options?: RequestInit,
): Promise<imageGenerateResponse> => {
	return fetch2<Promise<imageGenerateResponse>>(getGenerateImageUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(generateImageReq),
	});
};

export type createSectionResponse = {
	status: number;
	headers: Headers;
	data: Section;
};

export const getCreateSectionUrl = () => {
	return "api/section/";
};

export const createSection = async (
	createSectionReq: CreateSectionReq,
	options?: RequestInit,
): Promise<createSectionResponse> => {
	return fetch2<Promise<createSectionResponse>>(getCreateSectionUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(createSectionReq),
	});
};

export type findSectionsReq = {
	status: number;
	headers: Headers;
	data: Section[];
};

export const getFindSectionsUrl = () => {
	return "api/section/";
};

export const findSections = async (
	options?: RequestInit,
): Promise<findSectionsReq> => {
	return fetch2<Promise<findSectionsReq>>(getFindSectionsUrl(), {
		...options,
		method: "GET",
		headers: { ...options?.headers },
	});
};

export type createChatResponse = {
	status: number;
	headers: Headers;
	data: Chat;
};

export const getCreateChatUrl = () => {
	return "api/chat/";
};

export const createChat = async (
	createChatReq: CreateChatReq,
	options?: RequestInit,
): Promise<createChatResponse> => {
	return fetch2<Promise<createChatResponse>>(getCreateChatUrl(), {
		...options,
		method: "POST",
		headers: { "Content-Type": "application/json", ...options?.headers },
		body: JSON.stringify(createChatReq),
	});
};

export type findChatsResponse = {
	status: number;
	headers: Headers;
	data: Chat[];
};

export const getFindChatsUrl = (section_id: string) => {
	return `api/chat/${section_id}/section`;
};

export const findChats = async (
	section_id: string,
	options?: RequestInit,
): Promise<findChatsResponse> => {
	return fetch2<Promise<findChatsResponse>>(getFindChatsUrl(section_id), {
		...options,
		method: "GET",
		headers: { ...options?.headers },
	});
};
