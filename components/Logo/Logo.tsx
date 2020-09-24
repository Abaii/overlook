import React, { useState } from 'react';
import { Icon, LogoWrapper, TextWrapper, UDTriangle } from './Logo.styles';
import { Text } from '@chakra-ui/core';
import Typo from '../Typo/Typo';

interface Props {}

export const Logo = (props: Props) => {
	const [animation, setAnimation] = useState(false);

	return (
		<LogoWrapper onClick={() => setAnimation(true)}>
			<Icon animation={animation} />
			<UDTriangle />

			<TextWrapper>
				<Typo p_text='Overlook' style={{ fontFamily: 'News Cycle' }} />
			</TextWrapper>
		</LogoWrapper>
	);
};

export default Logo;
