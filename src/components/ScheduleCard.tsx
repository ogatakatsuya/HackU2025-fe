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
	title: string;
	content: string;
	handleCheckBox?: (id: string) => void;
};

export const ScheduleCard = ({
	id,
	title,
	content,
	handleCheckBox,
}: ScheduleCardProps) => {
	const [summary, setSummary] = useState("");
	useEffect(() => {
		if (content.length > 30) {
			setSummary(`${content.slice(0, 26)} ...`);
		} else {
			setSummary(content);
		}
	}, [content]);

	return (
		<Card
			sx={{ display: "flex", alignItems: "center", width: 300, minHeight: 150 }}
		>
			{handleCheckBox != null ? (
				<Checkbox onChange={() => handleCheckBox(id)} />
			) : (
				<></>
			)}
			<CardContent>
				<Typography variant="h6">{title}</Typography>
				<Typography variant="body2" color="text.secondary">
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ScheduleCard;
