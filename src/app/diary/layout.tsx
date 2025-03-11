import { AppContextProvider } from "@/components/Context";
import Header from "@/components/Header";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "日記",
};

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<AppContextProvider requireLogin={true}>
				<Header />
				{children}
			</AppContextProvider>
		</>
	);
}
