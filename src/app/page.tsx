"use client";

import Calendar from "@/components/Calendar";
import ChatPopup from "@/components/ChatPopup";
import Header from "@/components/Header";
import { PageLayout } from "@/components/Layout";
import { Box } from "@mui/material";

function Page() {
	return (
		<>
			<Header />
			<Box mt={10}>
				<Calendar />
			</Box>
			<Box
				position="fixed"
				bottom={0}
				left="50%"
				sx={{ transform: "translateX(-50%)" }}
			>
				<ChatPopup />
			</Box>
		</>
	);
}

export default PageLayout({ requireLogin: false, children: Page });
