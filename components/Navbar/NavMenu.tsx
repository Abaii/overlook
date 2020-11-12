import {
	IconButton,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Stack,
	Link,
	useDisclosure,
} from '@chakra-ui/core';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import AccountMenu from '../Account/AccountMenu';
import TimelineModal from '../Timeline/TimelineModal';

interface Props {
	user: any;
	handleSignOut: any;
}

const NavMenu = ({ user, handleSignOut }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton icon={FiMenu} onClick={onOpen} aria-label='menu button' />

			<Drawer placement='right' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px' textAlign='center'>
						Menu
					</DrawerHeader>
					<DrawerBody textAlign='center'>
						<Stack spacing={3}>
							<TimelineModal />
							<Link href='/timelines' mt={3}>
								Timelines
							</Link>
							<AccountMenu user={user} handleSignOut={handleSignOut} />
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NavMenu;
