import React from 'react';
import Title from '../components/Typo/Title/Title';
import Typo from '../components/Typo/Typo';
import {
	LandingTextWrapper,
	LandingImageWrapper,
	BottomOfPage,
} from '../styles/global_emotion.styles';
import { IconButton, Image, Flex } from '@chakra-ui/core';

const Home = () => {
	return (
		<>
			<Flex align='center' justify='center'>
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
			</Flex>

			<Flex align='center' justify='center'>
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
			</Flex>

			<Flex align='center' justify='center'>
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
			</Flex>
		</>
	);
};

export default Home;
