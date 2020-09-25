import React from 'react';
import { Link, Button } from '@chakra-ui/core';
import {
	NavbarElementWrapper,
	NavbarWrapper,
	SplitLinks,
	LogoLink,
} from './Navbar.styles';
import { LinkHoverWrapper } from '../SharedComponents.styles';
import Logo from './Logo/Logo';
import firebase from 'firebase';

interface NavBarProps {
	isLogged: boolean;
	user?: firebase.User;
}

const Navbar = ({ isLogged, user }: NavBarProps) => {
	if (isLogged) {
		<NavbarWrapper>
			<NavbarElementWrapper>
				<LogoLink>
					<Link href='/'>
						<Logo />
					</Link>
				</LogoLink>
			</NavbarElementWrapper>

			<SplitLinks>
				<LinkHoverWrapper>{user}</LinkHoverWrapper>
			</SplitLinks>
		</NavbarWrapper>;
	} else {
		return (
			<NavbarWrapper>
				<NavbarElementWrapper>
					<LogoLink>
						<Link href='/'>
							<Logo />
						</Link>
					</LogoLink>
				</NavbarElementWrapper>

				<SplitLinks>
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
				</SplitLinks>
			</NavbarWrapper>
		);
	}
};

export default Navbar;
