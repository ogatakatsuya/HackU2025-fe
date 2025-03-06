"use client";

import { logoutUser } from "@/api/client";
import { PageLayout } from "@/components/Layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
	const router = useRouter();

	useEffect(() => {
		logoutUser().then(() => {
			router.push("/");
		});
	}, [router]);

	return <p>ログアウトしています...</p>;
}

export default PageLayout({ requireLogin: false, children: Page });
