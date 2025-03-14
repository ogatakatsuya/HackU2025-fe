"use client";

import { createSuggestSchedules, suggestSchedules, updateScheduleIsRegistered } from "@/api/client";
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
	setShowSuggestForm: () => void;
};

export const submitted = false;
export const ScheduleSuggestForm = ({
	date,
	handleClose,
}: ScheduleFormProps) => {
	const [text, setText] = useState("");
	const [textError, setTextError] = useState(false);
	const [textErrorMessage, setTextErrorMessage] = useState("");
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
		if (!text) {
			setTextError(true);
			setTextErrorMessage("テキストを入力してください");
			isValid = false;
		} else {
			setTextError(false);
			setTextErrorMessage("");
		}

		return isValid;
	};
	const [idList, setIdList] = useState([] as string[]);

	const registerSchedule = () => {
		const token = findUserTokenFromCookie();
		if (!token) return;
		updateScheduleIsRegistered(
			idList,
			{ headers: { ...commonHeader({ token: token }) } },
		).then(({ status }) => {
			if (status === 204) {
				router.refresh();
			}
		});
		handleClose();
	}
	const handleSubmit = () => {
		if (validateInputs()) {
			const token = findUserTokenFromCookie();
			if (!token) return;
			createSuggestSchedules(
				text, date,
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ data, status }) => {
				if (status === 200) {
					router.refresh();
					setSuggestedSchedules(data);
				}
			});
		}
	};

	const handleCheckBox = (id: string) => {
		setIdList((prev) => {
			return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		})
	}

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
				<Box sx={{ textAlign: "center", mt: 3 }}>
					<Box sx={{ mt: 5, mb: 5 }}>
						{suggested_schedules &&
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
													title={schedule.title}
													content={schedule.content}
													handleCheckBox={() => handleCheckBox(schedule.id)}
												/>
											</Box>
										))}
									</Box>
								</>
							)}
					</Box>
				</Box>
				<TextField
					label="提案メッセージ"
					fullWidth
					multiline
					value={text}
					onChange={(event) => setText(event.target.value)}
					error={textError}
					helperText={textErrorMessage}
					color={textError ? "error" : "primary"}
				/>
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant="contained" fullWidth onClick={registerSchedule} disabled={idList.length === 0}>
					登録する
				</Button>
			</CardActions>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant="contained" fullWidth onClick={handleSubmit}>
					送信する
				</Button>
			</CardActions>
		</Card>
	);
};

export default ScheduleSuggestForm;
