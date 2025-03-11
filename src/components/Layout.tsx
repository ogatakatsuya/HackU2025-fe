import { AppContextProvider } from "./Context";
import Header from "./Header";

export const PageLayout =
	({
		requireLogin,
		children: Page,
	}: Readonly<{ requireLogin: boolean; children: React.FC }>) =>
	() => {
		return (
			<>
				<AppContextProvider requireLogin={requireLogin}>
					<Header />
					<Page />
				</AppContextProvider>
			</>
		);
	};
