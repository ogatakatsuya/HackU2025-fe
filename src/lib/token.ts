import Cookies from "js-cookie";

const userTokenCookieKey = "access-token";

export const findUserTokenFromCookie = () => {
	return Cookies.get(userTokenCookieKey);
};
