"use client";

import { findUser } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { User } from "@/api/schemas/user";
import { findUserTokenFromCookie } from "@/lib/token";
import { useRouter } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type AppState = {
	user: User | null;
	setCtxToken: (token: string) => void;
};

const initialAppState: AppState = {
	user: null,
	setCtxToken: () => {},
};

const appContext = createContext<AppState>(initialAppState);
export const useAppStateContext = () => useContext(appContext);

export const AppContextProvider = ({
	requireLogin,
	children,
}: { requireLogin: boolean; children: React.ReactNode }) => {
	const [token, setToken] = useState<string | undefined>(
		findUserTokenFromCookie(),
	);
	const [appState, setAppState] = useState<AppState>(initialAppState);
	const router = useRouter();

	useEffect(() => {
		setAppState((prev) => ({
			...prev,
			setCtxToken: (token: string) => setToken(token),
		}));
	}, []);

	useEffect(() => {
		if (!token) {
			if (requireLogin) router.push("/login");
			return;
		}

		findUser({
			headers: commonHeader({ token: token }),
		}).then(({ data: user, status }) => {
			if (status !== 200) {
				setAppState((prev) => ({
					...prev,
					user: null,
				}));
				if (requireLogin) router.push("/login");
				return;
			}

			setAppState((prev) => ({
				...prev,
				user: user,
			}));
		});
	}, [token, router, requireLogin]);

	return <appContext.Provider value={appState}>{children}</appContext.Provider>;
};
