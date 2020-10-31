import React, { useState, useEffect } from 'react';
//Styles
import {
	Link,
	Button,
	useToast,
	IconButton,
	Box,
	Menu,
	MenuList,
	MenuGroup,
	MenuItem,
	MenuButton,
	Skeleton,
	Icon,
	Avatar,
	useDisclosure,
} from '@chakra-ui/core';
import {
	NavbarElementWrapper,
	NavbarWrapper,
	SplitLinks,
	LogoLink,
	IconWrapper,
	NavbarElement,
} from './Navbar.styles';
import {
	LinkHoverWrapper,
	LoggedInInfoWrapper,
} from '../SharedComponents.styles';
// Auth
import { useAuth, signOut } from '../../utils/auth/AuthContext';
// Components
import Logo from './Logo/Logo';
import LoginModal from '../Auth/Login/Login';
import RegistrationModal from '../Auth/Registration/Registration';
import TimelineModal from '../Timeline/TimelineModal';
import AccountModal from '../Account/AccountModal';
// Icons
import { FaUser } from 'react-icons/fa';
import { MdTimeline } from 'react-icons/md';
// Router
import { useRouter } from 'next/router';

const Navbar = () => {
	const { user } = useAuth();
	const toast = useToast();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSignOut = () => {
		signOut()
			.then((result) => {
				toast({
					title: 'Signed Out',
					description: 'You have successfully signed out of your account.',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
				router.push('/');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				toast({
					title: errorCode,
					description: errorMessage,
					status: 'error',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
			});
	};

	let links;

	if (user) {
		links = (
			<>
				<LoggedInInfoWrapper first={true}>
					<NavbarElementWrapper>
						<TimelineModal />
					</NavbarElementWrapper>
					<Menu>
						<MenuButton style={{ outline: 'none' }}>
							<Avatar src={user.photoURL} />
						</MenuButton>
						<MenuList>
							<MenuGroup>
								<MenuItem onClick={() => onOpen()} minH='48px'>
									<Box as={FaUser} mr='12px' />
									Account
								</MenuItem>
								<MenuItem onClick={() => router.push('/timelines')} minH='48px'>
									<Box as={MdTimeline} mr='12px' />
									Timelines
								</MenuItem>
							</MenuGroup>
						</MenuList>
					</Menu>
				</LoggedInInfoWrapper>
				<NavbarElement>
					<Button
						onClick={handleSignOut}
						leftIcon='arrow-forward'
						variantColor='red'
					>
						Sign Out
					</Button>
				</NavbarElement>
			</>
		);
	} else {
		links = (
			<>
				<LinkHoverWrapper first={true}>
					<LoginModal />
				</LinkHoverWrapper>
				<LinkHoverWrapper>
					<RegistrationModal />
				</LinkHoverWrapper>
			</>
		);
	}

	return (
		<>
			<NavbarWrapper>
				<NavbarElementWrapper>
					<LogoLink>
						<Link href='/'>
							<Logo />
						</Link>
					</LogoLink>
				</NavbarElementWrapper>

				<SplitLinks>{links}</SplitLinks>
			</NavbarWrapper>

			<AccountModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default Navbar;
