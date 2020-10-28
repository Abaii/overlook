import React from 'react';
//Styles
import { Link, Button, useToast, IconButton, Box } from '@chakra-ui/core';
import {
	NavbarElementWrapper,
	NavbarWrapper,
	SplitLinks,
	LogoLink,
	IconWrapper,
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
// Icons
import { FaUser } from 'react-icons/fa';
// Router
import { useRouter } from 'next/router';

const Navbar = () => {
	const { user } = useAuth();
	const toast = useToast();
	const router = useRouter();

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

	user ?
		links = (
			<>
				<LoggedInInfoWrapper first={true}>
					<IconWrapper>
						<Box as={FaUser} size='20px' />
					</IconWrapper>
					{user.displayName || user.email}
					</LoggedInInfoWrapper>
				<NavbarElementWrapper>
					<TimelineModal />
				</NavbarElementWrapper>
				
				<Button
					onClick={handleSignOut}
					leftIcon='arrow-forward'
					variantColor='purple'
				>
					Sign Out
				</Button>
			</>
		)
	:
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
	

	return (
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
	);
};

export default Navbar;
