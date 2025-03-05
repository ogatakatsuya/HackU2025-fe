import type { User } from "./user";

export interface UserResp {
	access: string;
	refresh: string;
	user: User;
	email?: string;
	password1?: string;
	password2?: string;
}
