"use client";

import AccountButton from "@/components/AccountButton";
import { useAppStateContext } from "@/components/Context";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SectionsList from "./SectionsList";
import { useState } from "react";

export const Header = () => {
	const { user } = useAppStateContext();
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<AppBar>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<Box sx={{ flexGrow: 1 }}>
						<Button color="inherit" onClick={() => router.push("/")}>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								おもえも(仮)
							</Typography>
						</Button>
					</Box>
					<AccountButton user={user} />
				</Toolbar>
			</AppBar>
			<Drawer open={open} onClose={handleClose}>
				<SectionsList handleClose={handleClose} />
			</Drawer>
		</>
	);
};

export default Header;
