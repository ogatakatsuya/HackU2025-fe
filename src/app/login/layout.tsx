import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "ログイン",
};

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <>{children}</>;
}
