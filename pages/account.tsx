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
} from '@chakra-ui/core';
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
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>'
				/>
			</Head>

			<Flex justify='center' align='center' flexDirection='column' pt='22px'>
				<Heading m={'22px 0 22px 0'} size='2xl'>
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
							size='xl'
							mt={40}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default Account;
