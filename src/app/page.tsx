"use client";

import AccountButton from "@/components/AccountButton";
import { useAppStateContext } from "@/components/Context";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function Home() {
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
						<AccountButton />
					</Toolbar>
				</AppBar>
			</Box>
			<Box mt={10}>
				<Typography>email: {user ? user.email : undefined}</Typography>
			</Box>
		</>
	);
}
