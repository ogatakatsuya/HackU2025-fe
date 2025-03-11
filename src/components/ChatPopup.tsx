import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const ChatPopup = () => {
	const router = useRouter();

	return (
		<Button
			onClick={() => router.push("/chat/section1")}
			style={{ textAlign: "left" }}
		>
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
