// Chakra Imports
import {
	Avatar,
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
} from '@chakra-ui/react';
import Head from 'next/head';

// React Imports
import React, { useEffect, useState } from 'react';

// Other Imports
import axios from 'axios';
import { useAuth } from '../utils/auth/AuthContext';
import nookies from 'nookies';
import TimelineModal from '../components/Timeline/TimelineModal';

export const Account = () => {
	const { user } = useAuth();
	const [loaded, setLoaded] = useState(false);
	const token = nookies.get({}, 'token');

	return (
		<>
			<Head>
				<title>Account</title>
				<link
					rel='icon'
					href='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/water-wave_1f30a.png'
				/>
			</Head>

			<Flex justify='center' align='center' flexDirection='column' pt='22px'>
				<Heading m={'22px 0 22px 0'} boxSize='2xl'>
					Account
				</Heading>
				{user ? (
					<>
						<Stack spacing={5} align='center'>
							<Box p={5}>
								<Avatar
									name={user.displayName || user.email.split('@')[0]}
									src={user.photoURL}
								/>
								<Text mt={4} fontWeight='bold'>
									{user.displayName || user.email.split('@')[0]}
								</Text>
							</Box>
						</Stack>
					</>
				) : (
					<Flex justify='center' align='center'>
						<Spinner
							thickness='4px'
							emptyColor='gray.200'
							color='blue.500'
							boxSize='xl'
							mt={40}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default Account;
