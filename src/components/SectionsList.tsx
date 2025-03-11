import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";

type SectionsListProps = {
	handleClose: () => void;
};

export const SectionsList = ({ handleClose }: SectionsListProps) => {
	const router = useRouter();

	return (
		<Box sx={{ width: 250 }} role="presentation" onClick={() => handleClose()}>
			<List>
				<ListItem>
					<ListItemButton onClick={() => router.push("/chat/section1")}>
						<ListItemText>section1</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton onClick={() => router.push("/chat/section2")}>
						<ListItemText>section2</ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
};

export default SectionsList;
