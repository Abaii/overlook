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
	Heading,
	Icon,
	SimpleGrid,
	Skeleton,
	Spinner,
	Stack,
	Tag,
	Text,
} from '@chakra-ui/core';
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

export const Timelines = () => {
	const { user, loading } = useAuth();
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const token = nookies.get({}, 'token');
	const [selectedId, setSelectedId] = useState(null);

	async function getTimelines(uid, token) {
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
		getTimelines(user.uid, token.token);
	}

	return (
		<>
			<Head>
				<title>Overlook | All Timelines</title>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>'
				/>
			</Head>

			<Breadcrumb
				ml='30px'
				my={4}
				spacing='8px'
				separator={<Icon color='gray.300' name='chevron-right' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink href='#'>Timelines</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			{user && !loading && loaded ? (
				<Flex align='center' flexDirection='column' py='22px' height='100vh'>
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
								<Box width='100%' px={5}>
									<SimpleGrid minChildWidth='250px' spacing={4}>
										{data.map((timeline) => (
											<TimelineCard key={timeline._id} user={user} timeline={timeline} />
										))}

										<Flex align='center' justify='center' height='261px'>
											<TimelineModal />
										</Flex>
									</SimpleGrid>
								</Box>
							) : (
								<>
									<Box bg='white' rounded='lg' p={5}>
										<Stack spacing={5}>
											<Text fontSize='2xl' color='red.500' alignSelf='center'>
												No Timelines Created Yet
											</Text>
											<TimelineModal />
										</Stack>
									</Box>
								</>
							)}
						</>
					) : (
						<Flex justify='center' align='center' rounded='lg' p={2} bg='white'>
							<Spinner
								thickness='4px'
								emptyColor='gray.200'
								color='blue.500'
								speed='0.8s'
								size='xl'
							/>
						</Flex>
					)}
				</Flex>
			) : (
				<Flex justify='center' align='center' flexDirection='column' py='22px'>
					{!user && !loading ? (
						<LoginFullPage />
					) : (
						<Spinner
							thickness='4px'
							emptyColor='gray.200'
							color='blue.500'
							speed='0.8s'
							size='xl'
						/>
					)}
				</Flex>
			)}
		</>
	);
};

export default Timelines;
