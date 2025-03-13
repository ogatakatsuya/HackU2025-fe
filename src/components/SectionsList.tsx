import { createSection, findSections } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Section } from "@/api/schemas/section";
import { findUserTokenFromCookie } from "@/lib/token";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStateContext } from "./Context";

type SectionsListProps = {
	handleClose: () => void;
};

export const SectionsList = ({ handleClose }: SectionsListProps) => {
	const { user } = useAppStateContext();
	const [sections, setSections] = useState<Section[] | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [titleError, setTitleError] = useState<boolean>(false);
	const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const token = findUserTokenFromCookie();
		if (!token || !user) return;
		findSections({ headers: { ...commonHeader({ token: token }) } }).then(
			({ status, data }) => {
				if (status !== 200) return;
				const filteredSections = data.filter((d) => d.user === user.pk);
				setSections(filteredSections);
			},
		);
	}, [user]);

	const validateInputs = () => {
		let isValid = true;

		if (!title) {
			setTitleError(true);
			setTitleErrorMessage("タイトルを入力してください");
			isValid = false;
		} else {
			setTitleError(false);
			setTitleErrorMessage("");
		}

		return isValid;
	};

	const handleCreate = () => {
		const token = findUserTokenFromCookie();
		if (!title || !token) return;
		createSection(
			{ title: title },
			{ headers: { ...commonHeader({ token: token }) } },
		).then(({ status, data }) => {
			if (status === 201) router.push(`/chat/${data.id}`);
		});
		setOpen(false);
		handleClose();
	};

	return (
		<>
			<Box sx={{ width: 250 }} role="presentation">
				<List>
					{sections?.map((section) => (
						<ListItem key={section.id}>
							<ListItemButton
								disabled={pathname.replace("/chat/", "") === section.id}
								onClick={() => {
									router.push(`/chat/${section.id}`);
									handleClose();
								}}
							>
								<ListItemText>{section.title}</ListItemText>
							</ListItemButton>
						</ListItem>
					))}

					<ListItem>
						<ListItemButton
							sx={{ display: "flex", justifyContent: "center" }}
							onClick={() => (user ? setOpen(true) : router.push("/login"))}
						>
							<ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
								<AddIcon />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
					handleClose();
				}}
			>
				<DialogTitle>タイトルを入力</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						error={titleError}
						helperText={titleErrorMessage}
						color={titleError ? "error" : "primary"}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						fullWidth
						variant="contained"
						onClick={() => validateInputs() && handleCreate()}
					>
						作成
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SectionsList;
