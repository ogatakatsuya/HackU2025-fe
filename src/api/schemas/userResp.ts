import type { User } from "./user";

export interface UserResp {
	access: string;
	refresh: string;
	user: User;
}
