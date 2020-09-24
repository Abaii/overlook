import React from 'react';
import { HomePage } from '../styles/global_emotion.styles';
import Title from '../components/Title/Title';
import Typo from '../components/Typo/Typo';
import {
	LandingTextWrapper,
	LandingImageWrapper,
	BottomOfPage,
} from '../styles/global_emotion.styles';
import { IconButton } from '@chakra-ui/core';
import { css } from '@emotion/core';

const Home = () => {
	return (
		<>
			<HomePage>
				<section className='firstSection'>
					<LandingTextWrapper>
						<Title
							titleText='Welcome to Overlook:'
							tag='h1'
							style={{
								fontSize: '80px',
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
							<img src={require('../static/svg/peep-sitting-11.svg')} />
						</LandingImageWrapper>
					</LandingTextWrapper>
				</section>
			</HomePage>

			<HomePage>
				<section className='secondSection'>
					<LandingTextWrapper>
						<Title
							titleText="Whether you're an - Artist"
							tag='h1'
							style={{
								fontSize: '60px',
							}}
						/>
					</LandingTextWrapper>
					<LandingTextWrapper>
						<Typo p_text='You can use Overlook to track the progress of your art as you decide what it is that you are creating!' />
					</LandingTextWrapper>
					<LandingTextWrapper>
						<LandingImageWrapper>
							<img src={require('../static/svg/peep-sitting-12.svg')} />
						</LandingImageWrapper>
					</LandingTextWrapper>
					<LandingTextWrapper>
						<BottomOfPage>
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
						</BottomOfPage>
					</LandingTextWrapper>
				</section>
			</HomePage>
		</>
	);
};

export default Home;
