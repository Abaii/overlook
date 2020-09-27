import React from 'react';
import { Link, Button, useToast } from '@chakra-ui/core';
import {
	NavbarElementWrapper,
	NavbarWrapper,
	SplitLinks,
	LogoLink,
} from './Navbar.styles';
import {
	LinkHoverWrapper,
	LoggedInInfoWrapper,
} from '../SharedComponents.styles';
import Logo from './Logo/Logo';
import { useAuth, signOut } from '../../utils/auth/AuthContext';
import LoginModal from '../Auth/Login/Login';

const Navbar = (props) => {
	const { user } = useAuth();
	const toast = useToast();

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

	if (user && user.displayName) {
		links = (
			<>
				<LoggedInInfoWrapper first={true}>{user.displayName}</LoggedInInfoWrapper>
				<Button
					onClick={handleSignOut}
					leftIcon='arrow-forward'
					variantColor='purple'
				>
					Sign Out
				</Button>
			</>
		);
	} else if (user) {
		links = (
			<>
				<LoggedInInfoWrapper first={true}>{user.email}</LoggedInInfoWrapper>
				<Button
					onClick={handleSignOut}
					leftIcon='arrow-forward'
					variantColor='purple'
				>
					Sign Out
				</Button>
			</>
		);
	} else {
		links = (
			<>
				<LinkHoverWrapper first={true}>
					<LoginModal />
				</LinkHoverWrapper>
				<LinkHoverWrapper>
					<Link href='/register' fontSize='16px'>
						Register
					</Link>
				</LinkHoverWrapper>
			</>
		);
	}

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
