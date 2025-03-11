"use client";

import { findSchedules } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Diary } from "@/api/schemas/diary";
import Header from "@/components/Header";
import ScheduleCard from "@/components/ScheduleCard";
import { ScheduleForm } from "@/components/ScheduleForm";
import { findUserTokenFromCookie } from "@/lib/token";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
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
	const [schedules, setSchedules] = useState<Diary[] | null>(null);
	const [date, setDate] = useState<string | null>(null);
	const [openTextField, setOpenTextField] = useState<boolean>(false);
	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDate(resolvedParams.date);

			const token = findUserTokenFromCookie();
			if (!token || !date) return;
			console.log(date);
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
						schedules?.map((schedule) => {
							return (
								<Box width={300} key={schedule.id}>
									<ScheduleCard
										id={schedule.id}
										content={schedule.content}
										date={schedule.date}
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
		</>
	);
}

export default Page;
