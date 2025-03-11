import { API_BASE_URL } from "@/const";

export const fetch2 = async <T>(
	url: string,
	options: RequestInit,
): Promise<T> => {
	const requestUrl = `${API_BASE_URL}${url}`;
	const response = await fetch(requestUrl, options);
	const text = await response.text();
	const data = text ? JSON.parse(text) : null;
	return {
		status: response.status,
		data: data,
		headers: response.headers,
	} as T;
};

export const commonHeader = ({ token }: { token?: string }) => {
	return {
		...{
			Authorization: token ? `Bearer ${token}` : undefined,
		},
	} as HeadersInit;
};
