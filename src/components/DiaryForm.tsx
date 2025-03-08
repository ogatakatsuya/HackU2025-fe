"use client";

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
import { useState } from "react";

type DiaryFormProps = {
	img?: string;
	cont?: string;
	handleClose: () => void;
};

export const DiaryForm = ({ img, cont, handleClose }: DiaryFormProps) => {
	const [image, setImage] = useState(img);
	const [content, setContent] = useState(cont);
	const [contentError, setContentError] = useState(false);
	const [contentErrorMessage, setContentErrorMessage] = useState("");

	const validateInputs = () => {
		let isValid = true;

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

	return (
		<Card
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				minWidth: 320,
				maxWidth: 640,
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
						sx={{ objectFit: "contain" }}
					/>
				) : (
					<Typography>Upload Image</Typography>
				)}
			</Button>
			<CardContent>
				<TextField
					label="文章"
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
					onClick={() => validateInputs() && handleClose()}
				>
					登録
				</Button>
			</CardActions>
		</Card>
	);
};

export default DiaryForm;
