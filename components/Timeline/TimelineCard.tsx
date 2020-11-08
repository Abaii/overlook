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
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Link,
} from '@chakra-ui/core';
import React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { NONAME } from 'dns';

const MotionBox = motion.custom(Box);

export default function TimelineCard({ user, timeline }) {
	const token = nookies.get({}, 'token');
	const toast = useToast();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

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
		<>
			<MotionBox rounded='lg' borderWidth='1px' p={5} whileHover={{ scale: 1.05 }}>
				<Stack spacing={2}>
					<Link href={'/timeline/' + timeline._id} style={{ outline: 'none' }}>
						<Heading textAlign='center'>{timeline.title}</Heading>
					</Link>
					<Text my='20px' textAlign='center'>
						{timeline.description}
					</Text>
				</Stack>

				<Stack isInline spacing={3} justify='center'>
					<Tag variantColor='blue' rounded='full'>
						{user.displayName || user.email.split('@')[0]}
					</Tag>
					<IconButton
						aria-label='edit timeline'
						icon='edit'
						variantColor='yellow'
						rounded='full'
						onClick={() => onOpen()}
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

			{/* Edit Timeline Details Modal */}
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Timeline</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Text>{timeline.title}</Text>
							<Text>{timeline.description}</Text>
						</Stack>
					</ModalBody>
					<Flex justify='center' align='center' my={5}>
						<Stack isInline>
							<Button variantColor='blue' onClick={() => onClose()}>
								Close
							</Button>
							<Button variantColor='green' leftIcon='check'>
								Save Changes
							</Button>
						</Stack>
					</Flex>
				</ModalContent>
			</Modal>
		</>
	);
}

// {
// 	timeline.content[0] && (
// 		<Tag>{timeline.content[0].comment.length} Comments</Tag>
// 	);
// }
