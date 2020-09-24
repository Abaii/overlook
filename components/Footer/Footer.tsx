import React from "react";
import { Avatar, AvatarBadge, Text, Stack } from "@chakra-ui/core";
import {
	FooterElementsWrapper,
	FooterSingleElementWrapper,
	FooterWrapper,
} from "./Footer.styles";

const Footer = () => {
	return (
		<FooterWrapper>
			<footer>
				<Text fontSize='18px'>
					Developed & Designed by Abai Edmund & Johny Wills
				</Text>
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
	);
};

export default Footer;
