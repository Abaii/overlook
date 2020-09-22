import React from 'react';
import { Icon, LogoWrapper, TextWrapper, UDTriangle } from './Logo.styles';
import { Text } from '@chakra-ui/core';
import Typo from '../Typo/Typo';

interface Props {}

export const Logo = (props: Props) => {
	return (
		<LogoWrapper>
			<Icon />
			<UDTriangle />

			<TextWrapper>
				<Typo p_text='Overlook' style={{ fontFamily: 'News Cycle' }} />
			</TextWrapper>
		</LogoWrapper>
	);
};

export default Logo;
