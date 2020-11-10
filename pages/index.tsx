import React from 'react';
import Title from '../components/Typo/Title/Title';
import Typo from '../components/Typo/Typo';
import {
	LandingTextWrapper,
	LandingImageWrapper,
	BottomOfPage,
} from '../styles/global_emotion.styles';
import {
	IconButton,
	Image,
	Flex,
	Box,
	Button,
	Skeleton,
	Stack,
} from '@chakra-ui/core';
import Head from 'next/head';
import router from 'next/router';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../utils/auth/AuthContext';
import Typist from 'react-typist';
import { MdTimeline } from 'react-icons/md';

const Home = () => {
	const { user, loading } = useAuth();

	return (
		<>
			<Head>
				<title>Overlook | Home</title>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>'
				/>
			</Head>

			<Flex
				align='center'
				justify='center'
				flexDirection='column'
				bg='#111111'
				width='100%'
				height={!user ? '70vh' : '110vh'}
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
						textAlign: 'center',
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
				{!loading ? (
					<Flex align='center' justify='center' flexDirection='row'>
						{!user ? (
							<Button leftIcon={FaUser} onClick={() => router.push('/register')}>
								Sign Up Here!
							</Button>
						) : (
							<Button leftIcon={MdTimeline}>Timelines</Button>
						)}
					</Flex>
				) : (
					<Stack spacing={2} isInline>
						<Skeleton as={Button} mr={5}>
							Timelines
						</Skeleton>
						<Skeleton as={Button} mr={5}>
							Timelines
						</Skeleton>
						<Skeleton as={Button}>Timelines</Skeleton>
					</Stack>
				)}
			</Flex>

			{!user && (
				<>
					<Flex
						align='center'
						justify='center'
						flexDirection='column'
						flexWrap='wrap'
						height='110vh'
						width='100%'
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
								textAlign: 'center',
							}}
						/>

						<Typo
							p_text='The service which lets you track the progress of your projects and share it with anyone via a small link!'
							style={{
								margin: '0 0 20px 0',
								textAlign: 'center',
							}}
						/>

						<LandingImageWrapper>
							<Image src='../static/svg/Timeline.svg' />
						</LandingImageWrapper>
					</Flex>

					<Flex
						width='100%'
						height='110vh'
						justify='center'
						align='center'
						py={5}
						flexDirection='column'
						bg='#EFE5D8'
					>
						<Title
							titleText="Whether you're an - Artist"
							tag='h1'
							style={{
								fontSize: '60px',
								fontFamily: 'Nothing You Could Do',
								textAlign: 'center',
							}}
						/>

						<Typo p_text='You can use Overlook to track the progress of your art as you decide what it is that you are creating!' />
						<Image src='../static/blue-paint-brush-stroke-4.png' />
					</Flex>

					<Flex
						justify='center'
						align='center'
						flexDirection='row'
						flexWrap='wrap'
						width='100%'
						height='100vh'
						bg='#111111'
					>
						<Flex justify='center' align='center' flexDirection='column'>
							<h1
								style={{
									fontSize: '60px',
									fontFamily: 'Consolas',
									letterSpacing: '-6px',
									textAlign: 'center',
									color: '#33FF33',
								}}
							>
								Whether you're a - Developer{' '}
								<span className='Cursor Cursor--blinking'>|</span>
							</h1>
							<p style={{ color: '#33FF33', textAlign: 'center' }}>
								You can use Overlook to track the progress of your products as you
								develop them, and use it to display your workflow!
							</p>
						</Flex>
					</Flex>
				</>
			)}
		</>
	);
};

export default Home;
