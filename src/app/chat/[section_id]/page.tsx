"use client";

import { createChat, findChats } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Chat } from "@/api/schemas/chat";
import { findUserTokenFromCookie } from "@/lib/token";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ section_id: string }> }) {
	const [sectionId, setSectionId] = useState<string>();
	const [chats, setChats] = useState<Chat[] | null>();
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setSectionId(resolvedParams.section_id);
		};
		fetchData();
	}, [params]);

	useEffect(() => {
		if (!sectionId) return;
		const token = findUserTokenFromCookie();
		findChats(sectionId, {
			headers: { ...commonHeader({ token: token }) },
		}).then(({ status, data }) => {
			if (status === 200) {
				setChats(data);
				filterSortChats();
			}
		});
	}, [sectionId]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (event.shiftKey) {
				event.preventDefault();
				setMessage((prev) => `${prev}\n`);
			} else {
				event.preventDefault();
				handleSubmit();
			}
		}
	};

	const handleSubmit = () => {
		if (message?.trim() && sectionId && chats) {
			const token = findUserTokenFromCookie();
			createChat(
				{ content: message.trim(), section: sectionId },
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ status }) => {
				if (status !== 201) return;
				findChats(sectionId, {
					headers: { ...commonHeader({ token: token }) },
				}).then(({ status, data }) => {
					if (status === 200) {
						setChats(data);
						filterSortChats();
					}
				});
			});
			setMessage("");
		}
	};

	const filterSortChats = () => {
		if (!chats) return;
		const filteredChats = chats.filter((chat) => chat.section === sectionId);
		const sortedChats = filteredChats.sort((a, b) => {
			return (
				new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
			);
		});
		setChats(sortedChats);
	};

	return (
		<>
			<Box maxWidth={640} mx="auto" mt={10}>
				<Box height="calc(75vh - 100px)" overflow="auto">
					{chats?.map((chat) => {
						if (chat.role === 0) {
							return (
								<Box
									key={chat.id}
									display="flex"
									justifyContent="flex-end"
									mt={2}
								>
									<Box
										bgcolor="lightgray"
										borderRadius={5}
										display="inline-block"
										right={0}
										px={2}
										py={1}
									>
										<Typography variant="body1">{chat.content}</Typography>
									</Box>
								</Box>
							);
						}
						if (chat.role === 1) {
							return (
								<Box
									key={chat.id}
									display="flex"
									justifyContent="flex-start"
									mt={2}
								>
									<Typography variant="body1">{chat.content}</Typography>
								</Box>
							);
						}
					})}
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
							multiline
							onKeyDown={handleKeyDown}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
						<IconButton color="inherit" onClick={handleSubmit}>
							<ArrowUpwardIcon />
						</IconButton>
					</Paper>
				</Box>
			</Box>
		</>
	);
}

export default Page;
