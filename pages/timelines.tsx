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
			<Flex
				justify='center'
				align='center'
				flexDirection='column'
				w='100%'
				pt='22px'
			>
				<Heading m={'22px 0 22px 0'} size='2xl'>
					All Timelines
				</Heading>
				{user ? (
					<>
						{data.length && data ? (
							<SimpleGrid columns={3} spacing={5}>
								{data.map((timeline) => (
									<Box
										borderWidth='1px'
										rounded='lg'
										overflow='hidden'
										height='100%'
										bg='white'
										p={5}
									>
										<Heading>{timeline.title}</Heading>
										<Divider />
										<p style={{ marginBottom: '20px' }}>{timeline.description}</p>
										<Tag variantColor='green' rounded='full'>
											{user.displayName || user.email.split('@')[0]}
										</Tag>
									</Box>
								))}
							</SimpleGrid>
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
