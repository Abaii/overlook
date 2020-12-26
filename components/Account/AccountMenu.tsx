import { ArrowForwardIcon, ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
	Tooltip,
	Button,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuGroup,
	MenuItem,
	MenuDivider,
	Icon,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { MdTimeline } from "react-icons/md";
import { NavbarElementWrapper } from "../Navbar/Navbar.styles";
import TimelineModal from "../Timeline/TimelineModal";
import AccountModal from "./AccountModal";

interface Props {
	user: any;
	handleSignOut: any;
}

const AccountMenu = ({ user, handleSignOut }: Props) => {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Menu>
				<MenuButton>
					{user && <Avatar src={user.photoURL} name={user.displayName || user.email.split("@")[0]} />}
				</MenuButton>
				<MenuList>
					<MenuGroup>
						<MenuItem onClick={() => onOpen()}>Account Settings</MenuItem>
						<MenuDivider />
						<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>

			<AccountModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AccountMenu;
