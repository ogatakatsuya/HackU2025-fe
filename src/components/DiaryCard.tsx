"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type DiaryCardProps = {
	image?: string;
	content: string;
};

export const DiaryCard = ({ image, content }: DiaryCardProps) => {
	const [summary, setSummary] = useState("");

	useEffect(() => {
		if (content.length > 60) {
			setSummary(`${content.slice(0, 56)} ...`);
		} else {
			setSummary(content);
		}
	}, [content]);

	return (
		<>
			<Card sx={{ width: 300, height: 280 }}>
				<CardHeader
					sx={{ height: 60 }}
					action={
						<IconButton>
							<CloseIcon />
						</IconButton>
					}
				/>
				<CardMedia
					component="img"
					alt="thumbnail"
					image={image}
					sx={{ height: 140, objectFit: "contain" }}
				/>
				<CardContent sx={{ height: 80 }}>
					<Typography variant="body1">{summary}</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default DiaryCard;
