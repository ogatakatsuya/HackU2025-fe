"use client";

import DiaryForm from "@/components/DiaryForm";
import Header from "@/components/Header";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Modal,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page({
	params,
}: { params: Promise<{ date: string; diary_id: string }> }) {
	const [date, setDate] = useState<string | null>(null);
	const [diaryId, setDiaryId] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	// DEBUG
	const image = "/next.svg";
	const title = "title";
	const content =
		"content content content content content content content content content content content content content content";

	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDiaryId(resolvedParams.diary_id);
			setDate(resolvedParams.date);
			console.log(resolvedParams.date);
		};

		fetchData();
	}, [params]);

	return (
		<>
			<Header />

			<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
				<Card sx={{ minWidth: 320, maxWidth: 960, width: "80vw" }}>
					<CardActions>
						<Box sx={{ flexGrow: 1 }}>
							<IconButton onClick={() => router.back()}>
								<CloseIcon />
							</IconButton>
						</Box>
						<IconButton onClick={() => setOpen(true)}>
							<EditIcon />
						</IconButton>
						<IconButton>
							<DeleteIcon />
						</IconButton>
					</CardActions>
					{diaryId === "example-id" ? (
						<>
							{image ? (
								<CardMedia component="img" image={image} />
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
							<CardContent>{content}</CardContent>
						</>
					) : (
						<Typography textAlign="center">日記が存在しません</Typography>
					)}
				</Card>
			</Box>
			{date && (
				<Modal open={open} onClose={() => setOpen(false)}>
					<DiaryForm
						img={image}
						ttl={title}
						cont={content}
						date={date}
						handleClose={() => setOpen(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default Page;
