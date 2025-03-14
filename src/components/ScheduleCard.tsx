"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	IconButton,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ScheduleCardProps = {
	id: string;
	title: String;
	content: string;
	handleCheckBox?: (id: String) => void;

};

export const ScheduleCard = ({ id, title, content, handleCheckBox }: ScheduleCardProps) => {
	const [summary, setSummary] = useState("");
	useEffect(() => {
		if (content.length > 30) {
			setSummary(`${content.slice(0, 26)} ...`);
		} else {
			setSummary(content);
		}
	}, [content]);

	return (
		// <Card sx={{ width: 300, height: 250 }}>
		// 	<CardContent sx={{ height: 60, pt: 0.8 }}>
		// 		<Typography variant="body1">{summary}</Typography>
		// 	</CardContent>
		// </Card>
		// <Card sx={{ width: 300 }}>
		// 	<CardContent sx={{ height: 60, pt: 0.8 }}>
		// 		<Typography variant="h6" component="div">
		// 			{title}
		// 		</Typography>
		// 		<Typography variant="body2" color="text.secondary">
		// 			{content}
		// 		</Typography>
		// 	</CardContent>
		// </Card>
		<Card sx={{ display: "flex", alignItems: "center", width: 300 }}>
			{handleCheckBox != null ? <Checkbox onChange={() => handleCheckBox(id)} /> : <></>}
			< CardContent >
				<Typography variant="h6">{title}</Typography>
				<Typography variant="body2" color="text.secondary">
					{content}
				</Typography>
			</CardContent>
		</Card >
	);
};

export default ScheduleCard;
