import React from 'react';
import { Icon, LogoWrapper } from './Logo.styles';
import { Text } from '@chakra-ui/core';

interface Props {}

export const Logo = (props: Props) => {
	return (
		<>
			<LogoWrapper>
				<Icon></Icon>
				<Text>Overlook</Text>
			</LogoWrapper>
		</>
	);
};

export default Logo;
