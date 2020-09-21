import React from 'react';
import { Button, Link } from '@chakra-ui/core';

import { NavbarElementWrapper, NavbarWrapper } from './Navbar.styles';

const Navbar = () => {
	return (
		<>
			<NavbarWrapper>
				<NavbarElementWrapper>
					<Link href='/login'>Login</Link>
				</NavbarElementWrapper>

				<NavbarElementWrapper>
					<Link href='/register'>Register</Link>
				</NavbarElementWrapper>
			</NavbarWrapper>
		</>
	);
};

export default Navbar;
