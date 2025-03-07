"use client";

import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import type dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Calendar() {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		if (date) {
			const formattedDate = date.format("YYYY-MM-DD");
			router.push(`/diary/${formattedDate}`);
		}
	};

	if (!isClient) {
		return null;
	}

	return (
		<div>
			<Card elevation={0}>
				<CardHeader>
					<Typography>My Diary Calendar</Typography>
				</CardHeader>
				<CardContent>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar onChange={handleDateChange} />
					</LocalizationProvider>
				</CardContent>
			</Card>
		</div>
	);
}
