import { API_BASE_URL } from "@/const";

export const fetch2 = async <T>(
	url: string,
	options: RequestInit,
): Promise<T> => {
	const requestUrl = `${API_BASE_URL}${url}`;
	const response = await fetch(requestUrl, options);
	const data = await response.json();
	return { status: response.status, data, headers: response.headers } as T;
};

export const commonHeader = ({ token }: { token?: string }) => {
	return {
		...{
			Authorization: token ? `Bearer ${token}` : undefined,
		},
	} as HeadersInit;
};
