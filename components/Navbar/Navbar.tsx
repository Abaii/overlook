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

const Navbar = (props) => {
	const { user } = useAuth();
	const toast = useToast();

	const handleSignOut = () => {
		toast({
			title: 'Signed Out',
			description: 'You have successfully signed out of your account.',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});

		signOut();
	};

	let links;

	if (user) {
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
					<Link href='/login' fontSize='18px'>
						Login
					</Link>
				</LinkHoverWrapper>
				<LinkHoverWrapper>
					<Link href='/register' fontSize='18px'>
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
