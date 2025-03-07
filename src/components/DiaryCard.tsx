"use client";

import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

type DiaryCardProps = {
	image: string;
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
		<Card sx={{ width: 300, height: 250 }}>
			<CardMedia
				component="img"
				alt="thumbnail"
				image={image}
				sx={{ height: 140, objectFit: "contain" }}
			/>
			<CardContent sx={{ height: 60 }}>
				<Typography variant="body1">{summary}</Typography>
			</CardContent>
			<CardActions sx={{ height: 50 }}>
				<IconButton>
					<VisibilityIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default DiaryCard;
