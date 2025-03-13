"use client";

import { createDiary, generateDiaryImage, updateDiary } from "@/api/client";
import { commonHeader } from "@/api/custom";
import { findUserTokenFromCookie } from "@/lib/token";
import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DiaryFormProps = {
	id?: string;
	img?: string;
	ttl?: string;
	cont?: string;
	date: string;
	handleClose: () => void;
};

export const DiaryForm = ({
	id,
	img,
	ttl,
	cont,
	date,
	handleClose,
}: DiaryFormProps) => {
	const [image, setImage] = useState(img);
	const [time, setTime] = useState("");
	const [timeError, setTimeError] = useState(false);
	const [timeErrorMessage, setTimeErrorMessage] = useState("");
	const [title, setTitle] = useState(ttl ?? "");
	const [titleError, setTitleError] = useState(false);
	const [titleErrorMessage, setTitleErrorMessage] = useState("");
	const [content, setContent] = useState(cont ?? "");
	const [contentError, setContentError] = useState(false);
	const [contentErrorMessage, setContentErrorMessage] = useState("");
	const [fileLoading, setFileLoading] = useState(false);
	const [imageFileBase64, setImageFileBase64] = useState("");
	const [generatingImage, setGeneratingImage] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (!img || img !== image) return;
		fetch(img).then((res) => {
			res.blob().then((blob) => {
				readFile(
					new File([blob], new URL(img).pathname, { type: blob.type }),
					setImageFileBase64,
				);
			});
		});
	}, [img, image]);

	const readFile = (file: File, setFileBase64: (base64: string) => void) => {
		setFileLoading(true);
		const fileReader = new FileReader();
		fileReader.onload = (fileLoadEvent) => {
			const base64Full = fileLoadEvent.target?.result;
			if (typeof base64Full === "string") {
				const base64List = base64Full.split(",");
				setFileBase64(base64List[1]);
				setFileLoading(false);
			} else {
				alert("ファイルの読み込みに失敗しました");
			}
		};
		fileReader.onerror = (e) => {
			console.error(e);
			alert("ファイルの読み込みに失敗しました");
		};
		fileReader.readAsDataURL(file);
	};

	const validateInputs = () => {
		let isValid = true;

		if (!time) {
			setTimeError(true);
			setTimeErrorMessage("時間を入力してください");
			isValid = false;
		} else {
			setTimeError(false);
			setTimeErrorMessage("");
		}

		if (!title) {
			setTitleError(true);
			setTitleErrorMessage("タイトルを入力してください");
			isValid = false;
		} else {
			setTitleError(false);
			setTitleErrorMessage("");
		}

		if (!content) {
			setContentError(true);
			setContentErrorMessage("文章を入力してください");
			isValid = false;
		} else {
			setContentError(false);
			setContentErrorMessage("");
		}

		return isValid;
	};

	const handleSubmit = () => {
		if (fileLoading) return;
		if (generatingImage) return;
		if (!time || !title || !content) return;
		const token = findUserTokenFromCookie();
		if (!token) return;

		if (id) {
			updateDiary(
				{
					id: id,
					title: title,
					content: content,
					date: `${date}-${time}`,
					image: imageFileBase64,
				},
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ status }) => {
				if (status === 200) {
					router.refresh();
					handleClose();
				}
			});
		} else {
			createDiary(
				{
					title: title,
					content: content,
					date: `${date}-${time}`,
					image: imageFileBase64,
				},
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ status }) => {
				if (status === 201) {
					router.refresh();
					handleClose();
				}
			});
		}
	};

	const handleGenerateImage = async () => {
		if (!content) {
			setContentError(true);
			setContentErrorMessage("文章を入力してください");
			return;
		}
		const token = findUserTokenFromCookie();
		if (!token) return;
		if (generatingImage) return;

		setGeneratingImage(true);

		try {
			generateDiaryImage(
				{
					content: content,
				},
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ data, status }) => {
				if (status === 200) {
					setImage(`data:image/jpeg;base64,${data.image}`);
					setImageFileBase64(data.image);
				}
				setGeneratingImage(false);
			});
		} catch (error) {
			alert("画像生成に失敗しました");
			console.error(error);
			setGeneratingImage(false);
		}
	};

	return (
		<Card
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				minWidth: 320,
				maxWidth: 640,
				maxHeight: "90vh",
				overflow: "auto",
			}}
		>
			<CardHeader
				action={
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				}
			/>
			<Button sx={{ width: "100%", minHeight: 180, maxHeight: 360 }}>
				<input
					type="file"
					accept="image/*"
					onChange={(event) => {
						if (event.target.files?.[0]) {
							setImage(URL.createObjectURL(event.target.files[0]));
						}
						if (event.target.files)
							readFile(event.target.files[0], setImageFileBase64);
					}}
					style={{
						opacity: 0,
						position: "absolute",
						width: "100%",
						height: "100%",
					}}
				/>
				{image ? (
					<CardMedia
						component="img"
						image={image}
						sx={{ maxHeight: 360, objectFit: "contain", mb: 2 }}
					/>
				) : (
					<Typography>Upload Image</Typography>
				)}
			</Button>

			<CardContent>
				<Button
					sx={{ mb: 2 }}
					variant="outlined"
					fullWidth
					onClick={handleGenerateImage}
					disabled={generatingImage}
				>
					{generatingImage ? "生成中…" : "文章をもとに画像を生成"}
				</Button>
				<TextField
					label="時間"
					slotProps={{ inputLabel: { shrink: true } }}
					fullWidth
					type="time"
					sx={{ mb: 2 }}
					value={time}
					onChange={(event) => setTime(event.target.value)}
					error={timeError}
					helperText={timeErrorMessage}
					color={timeError ? "error" : "primary"}
				/>
				<TextField
					label="タイトル"
					slotProps={{ inputLabel: { shrink: true } }}
					fullWidth
					sx={{ mb: 2 }}
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					error={titleError}
					helperText={titleErrorMessage}
					color={titleError ? "error" : "primary"}
				/>
				<TextField
					label="文章"
					slotProps={{ inputLabel: { shrink: true } }}
					fullWidth
					multiline
					value={content}
					onChange={(event) => setContent(event.target.value)}
					error={contentError}
					helperText={contentErrorMessage}
					color={contentError ? "error" : "primary"}
				/>
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button
					variant="contained"
					fullWidth
					onClick={() => validateInputs() && handleSubmit()}
				>
					登録
				</Button>
			</CardActions>
		</Card>
	);
};

export default DiaryForm;
