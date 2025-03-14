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
type ScheduleFormProps = {
	date: string;
	handleClose: () => void;
};
import { SucheduleSuggestForm } from "@/components/ScheduleSuggestForm";
export const ScheduleForm = ({ date, handleClose }: ScheduleFormProps) => {
	const [content, setText] = useState("");
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

		if (!content) {
			setScheduleSuggestError(true);
			setScheduleSuggestErrorMessage("テキストを入力してください");
			isValid = false;
		} else {
			setScheduleSuggestError(false);
			setScheduleSuggestErrorMessage("");
		}

		return isValid;
	};
	const handleSuggest = () => {
		if (validateInputs()) {
			const token = findUserTokenFromCookie();
			setSuggestId(uuid_v4());
			if (!token) return;
			suggestSchedules(
				{
					text: content,
					date: date,
					suggest_id: suggest_id,
				},
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ data, status }) => {
				if (status === 201) {
					setIsSuggested(true);
					setSuggestedSchedules(data);
					router.refresh();
				}
			});
		}
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
				<Box sx={{ textAlign: "center", mt: 10 }}>
					<Typography component="h1" variant="h4">
						{date ? date : undefined}
					</Typography>
					<SucheduleSuggestForm date={date} />
					<Box sx={{ mt: 5, mb: 5 }}>
						{suggested_schedules &&
							is_suggested &&
							suggested_schedules.length > 0 && (
								<>
									<Typography component="h1" variant="h4">
										提案されたスケジュール
									</Typography>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											mt: 2,
											gap: 2,
											flexWrap: "wrap",
											width: "100%",
										}}
									>
										{suggested_schedules.map((schedule) => (
											<Box width={300} key={schedule.id}>
												<ScheduleCard
													id={schedule.id}
													content={schedule.content}
													date={schedule.date}
												/>
											</Box>
										))}
									</Box>
								</>
							)}
					</Box>
				</Box>
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
				<TextField
					label="予定提案"
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
				<Button variant="contained" fullWidth onClick={handleSuggest}>
					スケジュール生成
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
