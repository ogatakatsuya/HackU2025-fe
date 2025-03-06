"use client";

import { loginUser } from "@/api/client";
import { useAppStateContext } from "@/components/Context";
import { PageLayout } from "@/components/Layout";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Stack,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { useRouter } from "next/navigation";
import React from "react";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	overflow: "auto",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: "auto",
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	[theme.breakpoints.up("sm")]: {
		width: "450px",
	},
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
	height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
	minHeight: "100%",
	padding: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
	},
	"&::before": {
		content: '""',
		display: "block",
		position: "absolute",
		zIndex: -1,
		inset: 0,
		backgroundImage:
			"radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
		backgroundRepeat: "no-repeat",
		...theme.applyStyles("dark", {
			backgroundImage:
				"radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
		}),
	},
}));

function Page() {
	const { setCtxToken } = useAppStateContext();

	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

	const router = useRouter();

	const validateInputs = () => {
		let isValid = true;

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			setEmailError(true);
			setEmailErrorMessage("有効なメールアドレスを入力してください");
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage("");
		}

		if (!password || password.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage("パスワードは6文字以上で入力してください");
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage("");
		}

		return isValid;
	};

	const handleSignup = () => {
		loginUser({
			email: email,
			password: password,
		}).then(({ data, status }) => {
			if (status !== 200) {
				if (data.email) alert(data.email);
				if (data.password) alert(data.password);
				router.push("/login");
				return;
			}
			setCtxToken(data.access);
			router.push("/");
			return;
		});
	};

	return (
		<SignUpContainer direction="column" justifyContent="space-between">
			<Card variant="outlined">
				<Typography component="h1" variant="h4">
					ログイン
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<FormControl>
						<FormLabel htmlFor="email">メールアドレス</FormLabel>
						<TextField
							required
							fullWidth
							id="email"
							placeholder="your@email.com"
							name="email"
							autoComplete="email"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={emailError}
							helperText={emailErrorMessage}
							color={emailError ? "error" : "primary"}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">パスワード</FormLabel>
						<TextField
							required
							fullWidth
							name="password"
							placeholder="●●●●●●"
							type="password"
							id="password"
							autoComplete="new-password"
							variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={passwordError}
							helperText={passwordErrorMessage}
							color={passwordError ? "error" : "primary"}
						/>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={() => validateInputs() && handleSignup()}
					>
						ログイン
					</Button>
				</Box>
			</Card>
		</SignUpContainer>
	);
}

export default PageLayout({ requireLogin: false, children: Page });
