"use client";

import AccountButton from "@/components/AccountButton";
import Calendar from "@/components/Calendar";
import { useAppStateContext } from "@/components/Context";
import { PageLayout } from "@/components/Layout";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

function Page() {
	const { user } = useAppStateContext();

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							おもえも(仮)
						</Typography>
						<AccountButton user={user} />
					</Toolbar>
				</AppBar>
			</Box>
			<Box mt={10}>
				<Calendar />
			</Box>
		</>
	);
}

export default PageLayout({ requireLogin: false, children: Page });
