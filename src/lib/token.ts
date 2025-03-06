import Cookies from "js-cookie";

const userTokenCookieKey = "token";

export const saveUserTokenToCookie = (token: string) => {
	return Cookies.set(userTokenCookieKey, token, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "Lax",
	});
};

export const findUserTokenFromCookie = () => {
	return Cookies.get(userTokenCookieKey);
};
