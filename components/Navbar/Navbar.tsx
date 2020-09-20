import React from 'react';
import { Button } from '@chakra-ui/core';
import Registration from '../Registration/Registration';
import LoginForm from '../Login/Login';
import { NavbarElementWrapper, NavbarWrapper } from './Navbar.styles';

const Navbar = () => {
	return (
		<>
			<NavbarWrapper>
				<NavbarElementWrapper>
					<LoginForm></LoginForm>
				</NavbarElementWrapper>

				<NavbarElementWrapper>
					<Registration></Registration>
				</NavbarElementWrapper>
			</NavbarWrapper>
		</>
	);
};

export default Navbar;
