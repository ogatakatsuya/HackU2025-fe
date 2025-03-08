"use client";

import Calendar from "@/components/Calendar";
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
		</>
	);
}

export default PageLayout({ requireLogin: false, children: Page });
