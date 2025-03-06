"use client";

import { logoutUser } from "@/api/client";
import { useAppStateContext } from "@/components/Context";
import { PageLayout } from "@/components/Layout";
import { findUserTokenFromCookie, removeUserToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
	const router = useRouter();

	useEffect(() => {
		removeUserToken();
		logoutUser().then(() => {
			router.push("/");
		});
	}, [router]);

	return <p>ログアウトしています...</p>;
}

export default PageLayout({ requireLogin: false, children: Page });
