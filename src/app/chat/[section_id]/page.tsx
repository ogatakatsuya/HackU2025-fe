"use client";

import { createChat, findChats, findSections } from "@/api/client";
import { commonHeader } from "@/api/custom";
import type { Chat } from "@/api/schemas/chat";
import type { Section } from "@/api/schemas/section";
import { useAppStateContext } from "@/components/Context";
import { findUserTokenFromCookie } from "@/lib/token";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ section_id: string }> }) {
	const { user } = useAppStateContext();
	const [sectionId, setSectionId] = useState<string>();
	const [view, setView] = useState<boolean>(false);
	const [chats, setChats] = useState<Chat[] | null>();
	const [message, setMessage] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const resolvedParams = await params;
			setSectionId(resolvedParams.section_id);
		};
		fetchData();
	}, [params]);

	useEffect(() => {
		if (!sectionId || !user) return;
		const token = findUserTokenFromCookie();
		findSections({ headers: { ...commonHeader({ token: token }) } }).then(
			({ status, data }) => {
				if (status !== 200) return;
				if (
					data.filter((d) => d.user === user.pk && d.id === sectionId)
						.length === 0
				)
					return;
				setView(true);
				findChats(sectionId, {
					headers: { ...commonHeader({ token: token }) },
				}).then(({ status, data }) => {
					if (status === 200) {
						setChats(data);
						filterSortChats();
					}
				});
			},
		);
	}, [sectionId, user]);

	useEffect(() => {
		if (!chats) return;
		router.refresh();
	}, [chats, router]);

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

			const newChat: Chat = {
				id: Date.now().toString(),
				content: message.trim(),
				section: sectionId,
				role: 0,
				created_at: new Date().toISOString(),
			};
			setChats((prevChats) => [...(prevChats || []), newChat]);
			setLoading(true);

			createChat(
				{ content: message.trim(), section: sectionId },
				{ headers: { ...commonHeader({ token: token }) } },
			).then(({ status, data }) => {
				setLoading(false);
				if (status !== 201) return;
				setChats([...chats, newChat, data]); //会話＋返答を会話履歴に挿入
				router.push(`/chat/${sectionId}`);
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
			{view ? (
				<Box
					maxWidth={640}
					mx="auto"
					mt={10}
					display="flex"
					justifyContent="center"
				>
					<Box height="calc(75vh - 100px)" overflow="auto" width="90vw">
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
								disabled={loading}
							/>
							<IconButton
								color="inherit"
								onClick={handleSubmit}
								disabled={loading}
							>
								{loading ? <CircularProgress size={24} /> : <ArrowUpwardIcon />}
							</IconButton>
						</Paper>
					</Box>
				</Box>
			) : (
				<Typography variant="body1" mt={10}>
					チャットが存在しません
				</Typography>
			)}
		</>
	);
}

export default Page;
