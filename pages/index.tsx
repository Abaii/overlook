import React from 'react';
import Title from '../components/Typo/Title/Title';
import Typo from '../components/Typo/Typo';
import {
	LandingTextWrapper,
	LandingImageWrapper,
	BottomOfPage,
} from '../styles/global_emotion.styles';
import { IconButton, Image, Flex, Box } from '@chakra-ui/core';
import Head from 'next/head';

const Home = () => {
	return (
		<>
			<Head>
				<title>Overlook | Home</title>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>'
				/>
			</Head>

			<Flex as='main' align='center' justify='center' flexDirection='column'>
				<Flex
					align='center'
					justify='center'
					flexDirection='column'
					bg='#111111'
					width='100%'
					py={5}
				>
					<Title
						titleText='Welcome to'
						tag='h1'
						style={{
							fontSize: '120px',
							fontWeight: 'bold',
							color: '#fff',
							letterSpacing: '-8px',
							lineHeight: 1,
						}}
					/>
					<Title
						titleText='Overlook'
						tag='h1'
						style={{
							fontSize: '120px',
							fontWeight: 'bold',
							letterSpacing: '-6px',
							lineHeight: 1,
							background: '-webkit-linear-gradient(145deg, #b4373d, #b23acb)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							padding: '0px 10px',
						}}
					/>
					<Flex align='center' justify='center' flexDirection='row' mb={5}>
						<Title
							titleText='🎨'
							tag='h1'
							style={{
								fontSize: '80px',
								padding: '0',
							}}
						/>
						<Title
							titleText='👋'
							tag='h1'
							style={{
								fontSize: '80px',
								padding: '0',
							}}
						/>
					</Flex>
				</Flex>

				<Box px={10} width='100%' pt={5}>
					<Flex
						align='center'
						justify='center'
						flexDirection='column'
						flexWrap='wrap'
						my={5}
					>
						<Title
							titleText='Document the Journey, not just the Destination.'
							tag='h2'
							style={{
								margin: '0 0 50px 0',
								fontSize: '60px',
								fontWeight: 'bold',
								letterSpacing: '-4px',
								lineHeight: 1,
							}}
						/>

						<Typo
							p_text='The service which lets you track the progress of your projects and share it with anyone via a small link!'
							style={{
								margin: '0 0 20px 0',
							}}
						/>
						{/* <LandingImageWrapper>
							<Image
								src='../static/svg/Process.svg'
								alt='Illustration of a creative'
							/>
						</LandingImageWrapper> */}
					</Flex>

					<Flex justify='center' align='center' flexDirection='row' flexWrap='wrap'>
						<LandingImageWrapper>
							<Image
								src='../static/svg/peep-sitting-12.svg'
								alt='Illustration of a creative'
							/>
						</LandingImageWrapper>
						<Flex align='center' flexDirection='column'>
							<Title
								titleText="Whether you're an - Artist"
								tag='h1'
								style={{
									fontSize: '60px',
									fontFamily: 'Nothing You Could Do',
								}}
							/>

							<Typo p_text='You can use Overlook to track the progress of your art as you decide what it is that you are creating!' />
						</Flex>
					</Flex>

					<Flex justify='center' align='center' flexDirection='row' flexWrap='wrap'>
						<Flex justify='center' align='center' flexDirection='column'>
							<Title
								titleText="Whether you're a - Developer"
								tag='h1'
								style={{
									fontSize: '60px',
									fontFamily: 'Consolas',
									letterSpacing: '-6px',
									lineHeight: 1,
								}}
							/>
							<Typo p_text='You can use Overlook to track the progress of your products as you develop them, and use it to display your workflow!' />
						</Flex>

						<LandingImageWrapper>
							<Image
								src='../static/svg/peep-standing-3.svg'
								alt='Illustration of a creative'
							/>
						</LandingImageWrapper>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default Home;
