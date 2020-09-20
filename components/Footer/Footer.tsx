import React from 'react';
import { Avatar, AvatarBadge, Link, Stack } from '@chakra-ui/core';
import {
	FooterElementsWrapper,
	FooterSingleElementWrapper,
	FooterWrapper,
} from './Footer.styles';

const Footer = () => {
	return (
		<>
			<FooterWrapper>
				<footer>
					<p>Developed & Designed by Abai Edmund & Johny Wills</p>
					<FooterElementsWrapper>
						<FooterSingleElementWrapper>
							<a href='https://github.com/Abaii'>
								<Avatar name='Abai Edmund' />
							</a>
						</FooterSingleElementWrapper>
						<FooterSingleElementWrapper>
							<a href='https://github.com/JohnyWills1'>
								<Avatar name='Johny Wills' />
							</a>
						</FooterSingleElementWrapper>
					</FooterElementsWrapper>
				</footer>
			</FooterWrapper>
		</>
	);
};

export default Footer;
