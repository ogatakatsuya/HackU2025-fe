import { AppContextProvider } from "./Context";

export const PageLayout =
	({
		requireLogin,
		children: Page,
	}: Readonly<{ requireLogin: boolean; children: React.FC }>) =>
	() => {
		return (
			<>
				<AppContextProvider requireLogin={requireLogin}>
					<Page />
				</AppContextProvider>
			</>
		);
	};
