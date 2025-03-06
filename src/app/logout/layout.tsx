import { AppContextProvider } from "@/components/Context";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "ログアウト",
};

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <>{children}</>;
}
