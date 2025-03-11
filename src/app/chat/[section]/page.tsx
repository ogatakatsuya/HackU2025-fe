import Header from "@/components/Header";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function Page({ params }: { params: Promise<{ section: string }> }) {
	return (
		<>
			<Header />
			<Box maxWidth={640} mx="auto" mt={10}>
				<Box height="calc(75vh - 100px)" overflow="auto">
					<Box display="flex" justifyContent="flex-end" mt={2}>
						<Box
							bgcolor="lightgray"
							borderRadius={5}
							display="inline-block"
							right={0}
							px={2}
							py={1}
						>
							<Typography variant="body1">こんにちは</Typography>
						</Box>
					</Box>
					<Box display="flex" justifyContent="flex-start" mt={2}>
						<Typography variant="body1">こんにちは</Typography>
					</Box>
				</Box>
				<Box
					width="100%"
					maxWidth={640}
					position="fixed"
					bottom={20}
					left="50%"
					sx={{ transform: "translateX(-50%)" }}
				>
					<Paper sx={{ display: "flex" }}>
						<InputBase
							sx={{ ml: 2, flex: 1 }}
							placeholder="思い出を語りましょう"
						/>
						<IconButton color="inherit">
							<ArrowUpwardIcon />
						</IconButton>
					</Paper>
				</Box>
			</Box>
		</>
	);
}

export default Page;
