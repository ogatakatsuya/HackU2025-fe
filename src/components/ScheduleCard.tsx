"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ScheduleCardProps = {
	id: string;
	content: string;
	date: string;
};

export const ScheduleCard = ({ id, content, date }: ScheduleCardProps) => {
	const [summary, setSummary] = useState("");
	useEffect(() => {
		if (content.length > 30) {
			setSummary(`${content.slice(0, 26)} ...`);
		} else {
			setSummary(content);
		}
	}, [content]);

	return (
		<Card sx={{ width: 300, height: 250 }}>
			<CardContent sx={{ height: 60, pt: 0.8 }}>
				<Typography variant="body1">{summary}</Typography>
			</CardContent>
		</Card>
	);
};

export default ScheduleCard;
