import { createSection, findSections } from "@/api/client";
import { commonHeader } from "@/api/custom";
import { findUserTokenFromCookie } from "@/lib/token";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const ChatPopup = () => {
	const router = useRouter();

	const handleClick = () => {
		const token = findUserTokenFromCookie();
		findSections({ headers: { ...commonHeader({ token: token }) } }).then(
			({ status, data }) => {
				if (status !== 200) return;
				if (data.length > 0) {
					const latest = data[data.length - 1].id;
					router.push(`/chat/${latest}`);
				} else {
					createSection(
						{ title: "思い出トーク" },
						{ headers: { ...commonHeader({ token: token }) } },
					).then(({ status, data }) => {
						if (status !== 201) return;
						router.push(`/chat/${data.id}`);
					});
				}
			},
		);
	};

	return (
		<Button onClick={handleClick} style={{ textAlign: "left" }}>
			<Card sx={{ height: 200, width: "90vw" }}>
				<CardContent>
					<Typography variant="body1" pb={2} sx={{ fontWeight: "bold" }}>
						思い出チャットボット
					</Typography>
					<Box display="flex" sx={{ padding: 0 }}>
						<SmartToyIcon sx={{ mr: 2 }} />
						<Typography variant="body1">
							私と思い出トークをしませんか？
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Button>
	);
};

export default ChatPopup;
