"use client";

import { findDiaries, findSchedules } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Diary } from "@/api/schemas/diary";
import type { Schedule } from "@/api/schemas/schedule";
import DiaryCard from "@/components/DiaryCard";
import { DiaryForm } from "@/components/DiaryForm";
import Header from "@/components/Header";
import ScheduleCard from "@/components/ScheduleCard";
import ScheduleForm from "@/components/ScheduleForm";
import { findUserTokenFromCookie } from "@/lib/token";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
	Box,
	Modal,
	SpeedDial,
	SpeedDialIcon,
	TextField,
	Typography,
} from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ date: string }> }) {
	const [diaries, setDiaries] = useState<Diary[] | null>(null);
	const [date, setDate] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [text, setText] = useState("");
	const [openScheduleCreation, setOpenScheduleCreation] =
		useState<boolean>(false);
	const [openScheduleSuggestion, setOpenScheduleSuggestion] =
		useState<boolean>(false);
	const [view, setView] = useState(false);
	const [schedules, setSchedules] = useState<Schedule[] | null>(null);
	const month = dayjs(date).format("MM");
	const day = dayjs(date).format("DD");
	const year = dayjs(date).format("YYYY");
	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDate(resolvedParams.date);

			const token = findUserTokenFromCookie();
			if (!token || !date || !dayjs(date).isValid()) return;
			findDiaries(date, {
				headers: { ...commonHeader({ token: token }) },
			}).then(({ data, status }) => {
				setView(true);
				if (status === 200) setDiaries(data);
				else if (status === 404) setDiaries(null);
			});
			findSchedules(date, {
				headers: { ...commonHeader({ token: token }) },
			}).then(({ data, status }) => {
				if (status === 200) setSchedules(data);
				else if (status === 404) setSchedules(null);
			});
		};

		fetchData();
	}, [params, date]);

	return (
		<>
			{view ? (
				<>
					<Box sx={{ textAlign: "center", mt: 10 }}>
						<Typography component="h1" variant="h4">
							{date ? date : undefined}
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
							{date &&
								diaries?.map((diary) => {
									return (
										<Box width={300} key={diary.id}>
											<DiaryCard
												id={diary.id}
												image={diary.image}
												title={diary.title}
												content={diary.content}
												date={diary.date}
											/>
										</Box>
									);
								})}
						</Box>
						<Box sx={{ mt: 5, mb: 5 }}>
							{schedules &&
								schedules.filter((schedule) => schedule.date === date).length >
									0 && (
									<>
										<Typography component="h1" variant="h4">
											スケジュール
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
											{schedules
												.filter((schedule) => schedule.date === date)
												.map((schedule) => (
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
					<SpeedDial
						ariaLabel="Addition"
						icon={<SpeedDialIcon />}
						sx={{ position: "fixed", bottom: 16, right: 16 }}
					>
						<SpeedDialAction
							onClick={() => setOpen(true)}
							icon={<DescriptionIcon />}
							title="新規作成"
						/>
						<SpeedDialAction
							onClick={() => setOpenScheduleCreation(true)}
							icon={<AddTaskIcon />}
							title="予定生成"
						/>
					</SpeedDial>

					{date && (
						<Modal
							open={openScheduleCreation}
							onClose={() => setOpenScheduleCreation(false)}
						>
							<ScheduleForm
								date={date}
								handleClose={() => setOpenScheduleCreation(false)}
							/>
						</Modal>
					)}
					{date && (
						<Modal open={open} onClose={() => setOpen(false)}>
							<DiaryForm date={date} handleClose={() => setOpen(false)} />
						</Modal>
					)}
				</>
			) : (
				<Typography variant="body1" mt={10}>
					存在しない日付です
				</Typography>
			)}
		</>
	);
}

export default Page;
