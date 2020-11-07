import {
	Box,
	Heading,
	Divider,
	Text,
	Tag,
	Flex,
	Image,
	Stack,
	TagIcon,
	TagLabel,
	TagCloseButton,
	IconButton,
	useToast,
} from '@chakra-ui/core';
import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';
import axios from 'axios';
import nookies from 'nookies';
import { useRouter } from 'next/router';

const MotionBox = motion.custom(Box);

export default function TimelineCard({ user, timeline }) {
	const token = nookies.get({}, 'token');
	const toast = useToast();
	const router = useRouter();

	const editTimeline = async () => {};

	const deleteTimeline = async (id) => {
		await axios
			.delete('http://localhost:8080/api/timelines/' + id, {
				headers: {
					Authorization: 'Bearer ' + token.token,
				},
			})
			.then((response) => {
				toast({
					title: 'Deleted Timeline',
					description: `You have successfully deleted ${timeline.title}.`,
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
				setTimeout(router.reload, 2000);
			})
			.catch((err) => {
				var errorCode = err.code;
				var errorMessage = err.message;
				toast({
					title: errorCode,
					description: errorMessage,
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	return (
		<MotionBox rounded='lg' borderWidth='1px' p={5} whileHover={{ scale: 1.05 }}>
			<Stack spacing={2}>
				<Heading textAlign='center'>{timeline.title}</Heading>
				<Text my='20px' textAlign='center'>
					{timeline.description}
				</Text>
			</Stack>

			<Stack isInline spacing={2} justify='center'>
				<Tag variantColor='blue' rounded='full'>
					{user.displayName || user.email.split('@')[0]}
				</Tag>
				<IconButton
					aria-label='edit timeline'
					icon={FiEdit3}
					variantColor='orange'
					rounded='full'
					onClick={() => editTimeline()}
				/>
				<IconButton
					aria-label='delete timeline'
					icon='delete'
					variantColor='red'
					rounded='full'
					onClick={() => deleteTimeline(timeline._id)}
				/>
			</Stack>
		</MotionBox>
	);
}

// {
// 	timeline.content[0] && (
// 		<Tag>{timeline.content[0].comment.length} Comments</Tag>
// 	);
// }
