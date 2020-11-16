// Chakra Imports
import {
	Badge,
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Divider,
	Flex,
	Grid,
	Heading,
	Icon,
	SimpleGrid,
	Skeleton,
	Spinner,
	Stack,
	Tag,
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';

// React Imports
import React, { useEffect, useState } from 'react';

// Other Imports
import axios from 'axios';
import { useAuth } from '../utils/auth/AuthContext';
import nookies from 'nookies';
import TimelineModal from '../components/Timeline/TimelineModal';
import TimelineCard from '../components/Timeline/TimelineCard';
import Title from '../components/Typo/Title/Title';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { LoginFullPage } from '../components/Auth/Login/Login';
import { ChevronRightIcon, DragHandleIcon } from '@chakra-ui/icons';
import LoadingPage from '../components/Loading/LoadingPage';
import TimelineMenu from '../components/Timeline/TimelineMenu';

export const Timelines = () => {
	const { user, loading } = useAuth();
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	async function getTimelines(uid) {
		const { token } = await user.getIdTokenResult();
		await axios({
			method: 'get',
			url: 'http://localhost:8080/api/timelines/uid/' + uid,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'text/event-stream',
			},
		})
			.then((resp) => {
				setData(resp.data);
				setLoaded(true);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	if (user && loaded == false) {
		getTimelines(user.uid);
	}

	return (
		<>
			<Head>
				<title>Overlook | Timelines</title>
				<link
					rel='icon'
					href='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/water-wave_1f30a.png'
				/>
			</Head>

			<Breadcrumb
				ml='30px'
				my={4}
				spacing='8px'
				separator={<ChevronRightIcon color='gray.300' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink href='#'>Timelines</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			{user && !loading && loaded ? (
				<>
					<Flex
						align='center'
						flexDirection='column'
						py='22px'
						mx={2}
						height='fit-content'
					>
						<Title
							titleText='Timelines'
							tag='h2'
							style={{
								margin: '0 0 40px 0',
								fontSize: '60px',
								fontWeight: 'bold',
								letterSpacing: '-4px',
								lineHeight: 1,
							}}
						/>

						{!loading && data && loaded ? (
							<>
								{data.length ? (
									<Box width='95vw' px={5}>
										<Grid
											templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
											justifyContent='center'
											gap={5}
										>
											{data.map((timeline) => (
												<TimelineCard key={timeline._id} user={user} timeline={timeline} />
											))}
										</Grid>
									</Box>
								) : (
									<>
										<Box bg='white' rounded='lg' p={5}>
											<Stack spacing={5}>
												<Text fontboxSize='2xl' color='red.500' alignSelf='center'>
													No Timelines Created Yet
												</Text>
												<TimelineModal />
											</Stack>
										</Box>
									</>
								)}
							</>
						) : (
							<LoadingPage />
						)}
					</Flex>
					<TimelineMenu />
				</>
			) : (
				<>
					{!user && !loading ? (
						<Flex justify='center' align='center' flexDirection='column' py='22px'>
							<LoginFullPage />
						</Flex>
					) : (
						<LoadingPage />
					)}
				</>
			)}
		</>
	);
};

export default Timelines;
