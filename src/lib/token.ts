import { NextResponse } from "next/server";

export const saveUserTokenToCookie = (token: string) => {
	const response = new NextResponse();
	response.cookies.set("token", token, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
	});
	return response;
};
