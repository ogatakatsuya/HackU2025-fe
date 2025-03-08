"use client";

import DiaryCard from "@/components/DiaryCard";
import { DiaryForm } from "@/components/DiaryForm";
import Header from "@/components/Header";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
	Box,
	Modal,
	SpeedDial,
	SpeedDialIcon,
	Typography,
} from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useEffect, useState } from "react";

function Page({ params }: { params: { date: string } }) {
	const [date, setDate] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setDate(resolvedParams.date);
		};

		fetchData();
	}, [params]);

	return (
		<>
			<Header />
			<Box sx={{ textAlign: "center", mt: 10 }}>
				<Typography component="h1" variant="h4">
					{date ? date : undefined}
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mt: 2,
						gap: 2,
						flexWrap: "wrap",
						width: "100%",
					}}
				>
					{date && (
						<>
							{/* DEBUG */}
							<Box width={300}>
								<DiaryCard
									id="example-id"
									image="/next.svg"
									content="content content content content content content content content content content content content content content"
									date={date}
								/>
							</Box>
							<Box width={300}>
								<DiaryCard
									id="example-id"
									content="content content content content content content content content content content content content content content"
									date={date}
								/>
							</Box>
						</>
					)}
				</Box>
			</Box>
			<SpeedDial
				ariaLabel="Addition"
				icon={<SpeedDialIcon />}
				sx={{ position: "fixed", bottom: 16, right: 16 }}
			>
				<SpeedDialAction
					onClick={() => setOpen(true)}
					icon={<DescriptionIcon />}
					title="新規作成"
				/>
				<SpeedDialAction icon={<SmartToyIcon />} title="予定生成" />
			</SpeedDial>
			<Modal open={open} onClose={() => setOpen(false)}>
				<DiaryForm handleClose={() => setOpen(false)} />
			</Modal>
		</>
	);
}

export default Page;
