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
import Footer from '../components/Footer/Footer';

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

			<Flex align='center' justify='center' flexDirection='column'>
				<Box bg='white' rounded='lg' my={5} p={10} width='fit-content'>
					<section className='firstSection'>
						<LandingTextWrapper>
							<Title
								titleText='Welcome to'
								tag='h1'
								style={{
									fontSize: '80px',
									margin: '33px 0 33px 0',
								}}
							/>
							<Title
								titleText='Overlook'
								tag='h1'
								style={{
									fontSize: '85px',
									padding: '28px 0 0 25px',
									margin: '33px 0 33px 0',
									fontFamily: 'Nothing You Could Do',
								}}
							/>
						</LandingTextWrapper>
						<LandingTextWrapper>
							<Title
								titleText='🎨'
								tag='h1'
								style={{
									fontSize: '80px',
									margin: '0 0 53px 0',
									padding: '0',
								}}
							/>
							<Title
								titleText='👋'
								tag='h1'
								style={{
									fontSize: '80px',
									margin: '0 0 53px 0px',
									padding: '0',
								}}
							/>
						</LandingTextWrapper>
						<LandingTextWrapper>
							<Title
								titleText='Document the Journey, not just the Destination.'
								tag='h2'
								style={{
									margin: '0 0 50px 0',
									fontSize: '40px',
								}}
							/>
						</LandingTextWrapper>
						<LandingTextWrapper>
							<Typo
								p_text='The service which lets you track the progress of your projects and share it with anyone via a small link!'
								style={{
									margin: '0 0 20px 0',
								}}
							/>
						</LandingTextWrapper>
						<LandingTextWrapper>
							<LandingImageWrapper>
								<Image
									src='../static/svg/Process.svg'
									alt='Illustration of a creative'
								/>
							</LandingImageWrapper>
						</LandingTextWrapper>
					</section>

					<section className='secondSection'>
						<LandingTextWrapper>
							<Title
								titleText="Whether you're an - Artist"
								tag='h1'
								style={{
									fontSize: '60px',
									fontFamily: 'Nothing You Could Do',
								}}
							/>
						</LandingTextWrapper>
						<LandingTextWrapper>
							<Typo p_text='You can use Overlook to track the progress of your art as you decide what it is that you are creating!' />
						</LandingTextWrapper>
						<LandingTextWrapper>
							<LandingImageWrapper>
								<Image
									src='../static/svg/peep-sitting-12.svg'
									alt='Illustration of a creative'
								/>
							</LandingImageWrapper>
						</LandingTextWrapper>
						<LandingTextWrapper></LandingTextWrapper>
					</section>

					<section className='thirdSection'>
						<LandingTextWrapper>
							<Title
								titleText="Whether you're a - Developer"
								tag='h1'
								style={{
									fontSize: '60px',
									fontFamily: 'Consolas',
								}}
							/>
						</LandingTextWrapper>
						<LandingTextWrapper>
							<Typo p_text='You can use Overlook to track the progress of your products as you develop them, and use it to display your workflow!' />
						</LandingTextWrapper>
						<LandingTextWrapper>
							<LandingImageWrapper>
								<Image
									src='../static/svg/peep-standing-3.svg'
									alt='Illustration of a creative'
								/>
							</LandingImageWrapper>
						</LandingTextWrapper>
						<LandingTextWrapper></LandingTextWrapper>
					</section>
					{/* <BottomOfPage>
					<IconButton
						aria-label='move page down'
						icon='arrow-down'
						variantColor='purple'
						isRound={true}
						onClick={() => {
							// This is just temporary
							scrollTo(1000, 1000);
						}}
					/>
				</BottomOfPage> */}
				</Box>
			</Flex>
		</>
	);
};

export default Home;
