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
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { MdTimeline } from 'react-icons/md';
import { NavbarElementWrapper } from '../Navbar/Navbar.styles';
import TimelineModal from '../Timeline/TimelineModal';
import AccountModal from './AccountModal';

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
				<Tooltip label='Account Details' aria-label='account details'>
					<MenuButton style={{ outline: 'none' }}>
						{user && (
							<Avatar
								src={user.photoURL}
								name={user.displayName || user.email.split('@')[0]}
							/>
						)}
					</MenuButton>
				</Tooltip>
				<MenuList>
					<MenuGroup>
						<MenuItem onClick={() => onOpen()} height='50px' textAlign='center'>
							<Icon name='settings' mr='18px' size='28px' />
							Account Settings
							<Icon name='chevron-right' ml='12px' size='30px' />
						</MenuItem>
						<MenuDivider />
						<MenuItem justifyContent='center' style={{ background: 'none' }}>
							<Button
								onClick={handleSignOut}
								leftIcon='arrow-forward'
								variantColor='red'
							>
								Sign Out
							</Button>
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>

			<AccountModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AccountMenu;