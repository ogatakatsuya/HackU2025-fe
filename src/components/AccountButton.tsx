"use client";

import type { User } from "@/api/schemas/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type AccountButtonProps = {
	user?: User | null;
};

export const AccountButton = ({ user }: AccountButtonProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const router = useRouter();
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="account"
				onClick={handleClick}
			>
				<AccountCircleIcon fontSize="large" />
			</IconButton>
			{user ? (
				<></>
			) : (
				<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
					<MenuItem onClick={() => router.push("/login")}>ログイン</MenuItem>
					<MenuItem onClick={() => router.push("/signup")}>
						サインアップ
					</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default AccountButton;
