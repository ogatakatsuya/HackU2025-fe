"use client";

import { findDiaries } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Diary } from "@/api/schemas/diary";
import DiaryCard from "@/components/DiaryCard";
import { DiaryForm } from "@/components/DiaryForm";
import Header from "@/components/Header";
import { findUserTokenFromCookie } from "@/lib/token";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
	Box,
	Modal,
	SpeedDial,
	SpeedDialIcon,
	Typography,
	TextField,
} from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ScheduleForm from "@/components/ScheduleForm";

function Page({ params }: { params: Promise<{ date: string }> }) {
	const [diaries, setDiaries] = useState<Diary[] | null>(null);
	const [date, setDate] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [text, setText] = useState("");
	const [openTextField, setOpenTextField] = useState<boolean>(false);
	const month = dayjs(date).format("MM");
	const day = dayjs(date).format("DD");
	const year = dayjs(date).format("YYYY");
	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDate(resolvedParams.date);

			const token = findUserTokenFromCookie();
			if (!token || !date) return;
			findDiaries(date, {
				headers: { ...commonHeader({ token: token }) },
			}).then(({ data, status }) => {
				if (status === 200) setDiaries(data);
				else if (status === 404) setDiaries(null);
			});
		};

		fetchData();
	}, [params, date]);

	return (
		<>
			<Header />
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
					onClick={() => setOpenTextField(true)}
					icon={<SmartToyIcon />}
					title="予定生成"
				/>
			</SpeedDial>

			{date && (
				<Modal open={openTextField} onClose={() => setOpenTextField(false)}>
					<ScheduleForm
						date={date}
						handleClose={() => setOpenTextField(false)}
					/>
				</Modal>
			)}
			{date && (
				<Modal open={open} onClose={() => setOpen(false)}>
					<DiaryForm date={date} handleClose={() => setOpen(false)} />
				</Modal>
			)}
		</>
	);
}

export default Page;
