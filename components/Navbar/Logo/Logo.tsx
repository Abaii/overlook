import React, { useState } from 'react';
import { Icon, LogoWrapper, TextWrapper, UDTriangle } from './Logo.styles';
import Typo from '../../Typo/Typo';

export const Logo = () => {
	const [animation, setAnimation] = useState(false);

	return (
		<LogoWrapper onClick={() => setAnimation(true)}>
			<Icon animation={animation} />
			<UDTriangle />

			<TextWrapper>
				<Typo
					p_text='Overlook'
					style={{
						fontSize: '32px',
						margin: '0',
						paddingTop: '8px',
						fontFamily: 'Nothing You Could Do',
					}}
				/>
			</TextWrapper>
		</LogoWrapper>
	);
};

export default Logo;
