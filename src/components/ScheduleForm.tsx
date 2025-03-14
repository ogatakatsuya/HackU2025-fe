"use client";

import { suggestSchedules } from "@/api/client";
import { createSchedules } from "@/api/client";
import { commonHeader } from "@/api/custom";
import { findUserTokenFromCookie } from "@/lib/token";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import type { Schedule } from "@/api/schemas/schedule";
import ScheduleCard from "@/components/ScheduleCard";
import { title } from "node:process";
type ScheduleFormProps = {
	date: string;
	handleClose: () => void;
	setShowSuggestForm: () => void;
};
export const ScheduleForm = ({ date, handleClose, setShowSuggestForm }: ScheduleFormProps) => {
	const [title, setText] = useState("");
	const [textErrorMessage, setTextErrorMessage] = useState("");
	const [suggest_id, setSuggestId] = useState("");
	const [is_suggested, setIsSuggested] = useState(false);
	const [suggested_schedules, setSuggestedSchedules] = useState(
		[] as Schedule[],
	);
	const [schedule_content, setScheduleContent] = useState("");
	const [scheduleSuggestError, setScheduleSuggestError] = useState(false);
	const [scheduleSuggestErrorMessage, setScheduleSuggestErrorMessage] =
		useState("");
	const router = useRouter();
	const validateInputs = () => {
		let isValid = true;

		if (!title) {
			setScheduleSuggestError(true);
			setScheduleSuggestErrorMessage("テキストを入力してください");
			isValid = false;
		} else {
			setScheduleSuggestError(false);
			setScheduleSuggestErrorMessage("");
		}

		return isValid;
	};
	const moveAISuggest = () => {
		setShowSuggestForm()
	};
	const handleSubmit = () => {
		if (validateInputs()) {
			const token = findUserTokenFromCookie();
			if (!token) return;
			createSchedules(
				{
					date: date,
					title: title,
					content: schedule_content,
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
					label="タイトル"
					fullWidth
					multiline
					value={title}
					onChange={(event) => setText(event.target.value)}
					helperText={textErrorMessage}
				/>
				<TextField
					label="内容"
					fullWidth
					multiline
					value={schedule_content}
					onChange={(event) => setScheduleContent(event.target.value)}
					error={scheduleSuggestError}
					helperText={scheduleSuggestErrorMessage}
					color={scheduleSuggestError ? "error" : "primary"}
				/>
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant="contained" fullWidth onClick={moveAISuggest}>
					AIに依頼する
				</Button>
			</CardActions>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant="contained" fullWidth onClick={handleSubmit}>
					登録
				</Button>
			</CardActions>
		</Card>
	);
};

export default ScheduleForm;
