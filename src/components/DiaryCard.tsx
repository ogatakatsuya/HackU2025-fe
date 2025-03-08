"use client";

import {
	Box,
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
import { useRouter } from "next/navigation";

type DiaryCardProps = {
	id: string;
	image?: string;
	content: string;
	date: string;
};

export const DiaryCard = ({ id, image, content, date }: DiaryCardProps) => {
	const [summary, setSummary] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (content.length > 60) {
			setSummary(`${content.slice(0, 56)} ...`);
		} else {
			setSummary(content);
		}
	}, [content]);

	return (
		<Card sx={{ width: 300, height: 250 }}>
			{image ? (
				<CardMedia
					component="img"
					alt="thumbnail"
					image={image}
					sx={{ height: 140, objectFit: "contain" }}
				/>
			) : (
				<Box
					height={140}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography>No Image</Typography>
				</Box>
			)}
			<CardContent sx={{ height: 60, pt: 0.8 }}>
				<Typography variant="body1">{summary}</Typography>
			</CardContent>
			<CardActions sx={{ height: 50 }}>
				<IconButton onClick={() => router.push(`/diary/${date}/${id}`)}>
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
