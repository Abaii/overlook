import React, { useState } from 'react';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import {
	FooterElementsWrapper,
	FooterSingleElementWrapper,
	FooterWrapper,
} from './Footer.styles';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Footer = () => {
	const [show, setShow] = useState(false);

	return (
		<Flex align='center' justify='center' mt={5} mb={5} flexDirection='column'>
			<IconButton
				aria-label='close footer button'
				icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
				rounded='full'
				size='sm'
				mb={2}
				onClick={() => setShow(!show)}
			/>

			{show && (
				<Box py={2} rounded='lg' bg='white' p={3} textAlign='center'>
					<footer>
						<Text fontboxSize='14px' mb={2}>
							Developed & Designed by Abai Edmund & Johny Wills
						</Text>
						<FooterElementsWrapper>
							<FooterSingleElementWrapper>
								<a href='https://github.com/Abaii'>
									<Avatar name='Abai Edmund' size='sm' />
								</a>
							</FooterSingleElementWrapper>
							<FooterSingleElementWrapper>
								<a href='https://github.com/JohnyWills1'>
									<Avatar name='Johny Wills' size='sm' />
								</a>
							</FooterSingleElementWrapper>
						</FooterElementsWrapper>
					</footer>
				</Box>
			)}
		</Flex>
	);
};

export default Footer;
