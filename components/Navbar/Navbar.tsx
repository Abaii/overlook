import React from 'react';
import { Link, Button } from '@chakra-ui/core';
import {
	NavbarElementWrapper,
	NavbarWrapper,
	SplitLinks,
} from './Navbar.styles';
import { LinkHoverWrapper } from '../SharedComponents.styles';

const Navbar = () => {
	return (
		<>
			<NavbarWrapper>
				<NavbarElementWrapper>
					<LinkHoverWrapper>
						<Link href='/'>Home</Link>
					</LinkHoverWrapper>
				</NavbarElementWrapper>

				<SplitLinks>
					<LinkHoverWrapper first={true}>
						<Link href='/login'>Login</Link>
					</LinkHoverWrapper>
					<LinkHoverWrapper>
						<Link href='/register'>Register</Link>
					</LinkHoverWrapper>
				</SplitLinks>
			</NavbarWrapper>
		</>
	);
};

export default Navbar;
