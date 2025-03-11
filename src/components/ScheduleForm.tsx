"use client";

import { useState } from "react";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { findUserTokenFromCookie } from "@/lib/token";
import { useRouter } from "next/navigation";
import { createSchedules } from "@/api/client";
import { commonHeader } from "@/api/custom";
type ScheduleFormProps = {
	date: string;
	handleClose: () => void;
};

export const ScheduleForm = ({ date, handleClose }: ScheduleFormProps) => {
	const [content, setText] = useState("");
	const [textError, setTextError] = useState(false);
	const [textErrorMessage, setTextErrorMessage] = useState("");
	const router = useRouter();
	const validateInputs = () => {
		let isValid = true;

		if (!content) {
			setTextError(true);
			setTextErrorMessage("テキストを入力してください");
			isValid = false;
		} else {
			setTextError(false);
			setTextErrorMessage("");
		}

		return isValid;
	};

	const handleSubmit = () => {
		if (validateInputs()) {
			const token = findUserTokenFromCookie();
			if (!token) return;
			createSchedules(
				{
					date: date,
					content: content,
				},
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ status }) => {
				if (status === 201) {
					router.refresh();
					handleClose();
				}
			});
		}
	};

	return (
		<Card
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				minWidth: 320,
				maxWidth: 640,
				maxHeight: "90vh",
				overflow: "auto",
			}}
		>
			<CardHeader
				action={
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				}
			/>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					{date}
				</Typography>
				<TextField
					label="予定内容"
					fullWidth
					multiline
					value={content}
					onChange={(event) => setText(event.target.value)}
					error={textError}
					helperText={textErrorMessage}
					color={textError ? "error" : "primary"}
				/>
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant="contained" fullWidth onClick={handleSubmit}>
					登録
				</Button>
			</CardActions>
		</Card>
	);
};

export default ScheduleForm;
