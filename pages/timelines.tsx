// Chakra Imports
import {
	Badge,
	Box,
	Button,
	Divider,
	Flex,
	Heading,
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

export const Timelines = () => {
	const { user } = useAuth();
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const token = nookies.get({}, 'token');

	async function getTimelines(uid, token) {
		console.log('-- getTimelines function run --');
		await axios({
			method: 'get',
			url: 'http://localhost:8080/api/timelines/' + uid,
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

	if (user != null) {
		const uid = user.uid;
		if (!loaded) {
			getTimelines(uid, token.token);
		}
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

			<Flex justify='center' align='center' flexDirection='column' pt='22px'>
				<Heading m={'22px 0 22px 0'} size='2xl'>
					All Timelines
				</Heading>
				{user ? (
					<>
						{data.length && data ? (
							<Box width='100%' px={5}>
								<SimpleGrid minChildWidth='250px' spacing={4}>
									{data.map((timeline) => (
										<Box rounded='lg' overflow='hidden' bg='white' height='100%' p={5}>
											<Heading>{timeline.title}</Heading>
											<Divider />
											<p style={{ marginBottom: '20px', marginTop: '20px' }}>
												{timeline.description}
											</p>
											<Tag variantColor='green' rounded='full'>
												{user.displayName || user.email.split('@')[0]}
											</Tag>
										</Box>
									))}
								</SimpleGrid>
							</Box>
						) : (
							<>
								<Stack spacing={5}>
									<Text fontSize='2xl' color='red.500' alignSelf='center'>
										No Timelines Yet Created
									</Text>
									<TimelineModal />
								</Stack>
							</>
						)}
					</>
				) : (
					<Flex justify='center' align='center'>
						<Spinner
							thickness='4px'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
							mt={40}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default Timelines;
