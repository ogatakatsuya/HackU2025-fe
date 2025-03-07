"use client";

import DiaryCard from "@/components/DiaryCard";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Page({ params }: { params: { date: string } }) {
	const [date, setDate] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDate(resolvedParams.date);
		};

		fetchData();
	}, [params]);

	return (
		<Box sx={{ textAlign: "center" }}>
			<Typography component="h1" variant="h4">
				{date ? date : undefined}
			</Typography>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
				<DiaryCard
					image="/next.svg"
					content="content content content content content content content content content content content content content content"
				/>
			</Box>
		</Box>
	);
}

export default Page;
