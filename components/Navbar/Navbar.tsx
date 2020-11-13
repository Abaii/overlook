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
	MenuDivider,
	Tooltip,
	Flex,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Stack,
} from '@chakra-ui/react';
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
import { FiMenu } from 'react-icons/fi';
import { MdTimeline } from 'react-icons/md';
// Router
import { useRouter } from 'next/router';
import NavMenu from './NavMenu';
import AccountMenu from '../Account/AccountMenu';

const Navbar = () => {
	const { user, loading } = useAuth();
	const toast = useToast();
	const router = useRouter();

	const handleSignOut = () => {
		router.push('/').then(() => {
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
		});
	};

	const loggedInLinks = (
		<>
			<Flex display={['none', 'none', 'flex']}>
				<Tooltip label='Create a Timeline' aria-label='create a timeline button'>
					<NavbarElementWrapper>
						<TimelineModal />
					</NavbarElementWrapper>
				</Tooltip>

				<NavbarElementWrapper>
					<Button
						leftIcon={<MdTimeline />}
						variant='outline'
						colorScheme='purple'
						onClick={() => router.push('/timelines')}
						rounded='full'
					>
						Timelines
					</Button>
				</NavbarElementWrapper>

				<AccountMenu user={user} handleSignOut={handleSignOut} />
			</Flex>

			<Flex display={['flex', 'flex', 'none']}>
				<NavMenu user={user} handleSignOut={handleSignOut} />
			</Flex>
		</>
	);

	const loggedOutLinks = (
		<SplitLinks>
			<LinkHoverWrapper>
				<Box mr={['15px', '20px', '25px']}>
					<LoginModal reRoute='/' />
				</Box>
			</LinkHoverWrapper>
			<LinkHoverWrapper>
				<RegistrationModal />
			</LinkHoverWrapper>
		</SplitLinks>
	);

	const loadingLinks = (
		<Flex display={['none', 'none', 'flex']}>
			<Flex justify='center' align='center'>
				<Skeleton as={IconButton} rounded='full' mr={5} />
				<Skeleton as={Button} height='40px' width='122px' rounded='full' mr={5} />
				<Skeleton as={Avatar} rounded='full' />
			</Flex>
		</Flex>
	);

	const NavBarLink = ({ user }) => {
		if (user == null) {
			return loggedOutLinks;
		} else {
			return loggedInLinks;
		}
	};

	return (
		<>
			<Flex
				justify='space-between'
				align='center'
				borderBottom='1px solid #e2e8f0'
				width='100%'
				p='1.5rem'
				as='nav'
				wrap='wrap'
			>
				<NavbarElementWrapper>
					<LogoLink>
						<Link href='/'>
							<Logo />
						</Link>
					</LogoLink>
				</NavbarElementWrapper>

				{loading ? loadingLinks : <NavBarLink user={user} />}
			</Flex>
		</>
	);
};

export default Navbar;
