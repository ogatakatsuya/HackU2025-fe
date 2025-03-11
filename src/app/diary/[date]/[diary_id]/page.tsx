"use client";

import { deleteDiary, findDiaries } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Diary } from "@/api/schemas/diary";
import DiaryForm from "@/components/DiaryForm";
import Header from "@/components/Header";
import { findUserTokenFromCookie } from "@/lib/token";
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
	const [diary, setDiary] = useState<Diary | null>(null);
	const [date, setDate] = useState<string | null>(null);
	const [diaryId, setDiaryId] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDiaryId(resolvedParams.diary_id);
			setDate(resolvedParams.date);

			const token = findUserTokenFromCookie();
			if (!token || !date) return;
			findDiaries(date, {
				headers: { ...commonHeader({ token: token }) },
			}).then(({ data, status }) => {
				if (status === 200) {
					data.map((d) => {
						if (d.id === resolvedParams.diary_id) setDiary(d);
					});
				}
			});
		};

		fetchData();
	}, [params, date]);

	return (
		<>
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
						<IconButton
							onClick={() => {
								if (!diary) return;
								const token = findUserTokenFromCookie();
								deleteDiary(diary.id, {
									headers: { ...commonHeader({ token: token }) },
								});
								router.push(`/diary/${diary.date}`);
							}}
						>
							<DeleteIcon />
						</IconButton>
					</CardActions>
					{diary ? (
						<>
							{diary.image ? (
								<CardMedia
									component="img"
									image={diary.image}
									sx={{ maxHeight: 360, objectFit: "contain" }}
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
							<CardContent>
								<Typography variant="h4">{diary.title}</Typography>
								<Typography variant="body2" pb={1}>
									{diary.date}
								</Typography>
								<Typography variant="body1">{diary.content}</Typography>
							</CardContent>
						</>
					) : (
						<Typography textAlign="center">日記が存在しません</Typography>
					)}
				</Card>
			</Box>
			{diary && (
				<Modal open={open} onClose={() => setOpen(false)}>
					<DiaryForm
						id={diary.id}
						img={diary.image}
						ttl={diary.title}
						cont={diary.content}
						date={diary.date.slice(-5)}
						handleClose={() => setOpen(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default Page;
