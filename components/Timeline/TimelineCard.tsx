import {
	Box,
	Heading,
	Divider,
	Text,
	Tag,
	Flex,
	Image,
	Stack,
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
	FormControl,
	InputGroup,
	FormErrorMessage,
	Input,
	InputRightElement,
	FormLabel,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Switch,
	Badge,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { Form, Formik, FormikErrors, FormikProps } from 'formik';
import { FormButtonWrapper } from '../Auth/Login/Login.styles';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { LinkHoverWrapper } from '../SharedComponents.styles';

const MotionBox = motion.custom(Box);

interface EditTimelineValues {
	title: string;
	description: string;
}

interface TimelineProps {
	user: any;
	timeline: any;
	onTimelineChange: (id: number, title: string, description: string) => void;
	deleteTimeline: (id: number) => void;
}

export default function TimelineCard({
	user,
	timeline,
	onTimelineChange,
	deleteTimeline,
}: TimelineProps) {
	const token = nookies.get({}, 'token');
	const toast = useToast();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [alertOpen, setIsOpen] = useState(false);
	const alertClose = () => setIsOpen(false);
	const cancelRef = React.useRef();
	const [isSubmitting, setSubmitting] = useState(false);

	const initialValues = {
		title: timeline.title,
		description: timeline.description,
	};

	const delTimeline = async (id) => {
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
				alertClose();
				deleteTimeline(id);
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

	const handleSubmit = ({ title, description }: EditTimelineValues) => {
		setSubmitting(!isSubmitting);
		axios
			.put(
				'http://localhost:8080/api/timelines/' + timeline._id,
				{
					title: title,
					description: description,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token.token,
					},
				}
			)
			.then((response) => {
				onTimelineChange(timeline._id, title, description);
				setSubmitting(false);
				onClose();
			})
			.catch((err) => {
				setSubmitting(false);
				var errorMessage = err.message;
				toast({
					title: errorMessage,
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	const validate = (values: EditTimelineValues) => {
		const errors: FormikErrors<EditTimelineValues> = {};

		if (!values.title) {
			errors.title = 'You must enter a title';
		}

		if (!values.description) {
			errors.description = 'You must enter a description';
		}

		return errors;
	};

	return (
		<>
			<MotionBox
				minW={['250px', '300px', '350px']}
				height='fit-content'
				rounded='lg'
				borderWidth='1px'
				p={5}
				whileHover={{ scale: 1.05 }}
			>
				<Stack spacing={2}>
					<Heading textAlign='center'>
						<Link href={'/timeline/' + timeline._id}>{timeline.title}</Link>
					</Heading>
					<Text my='20px' textAlign='center'>
						{timeline.description}
					</Text>
				</Stack>

				<Stack isInline spacing={3} justify='center' align='center'>
					<Tag colorScheme='blue' rounded='full'>
						{user.displayName || user.email.split('@')[0]}
					</Tag>
					<IconButton
						aria-label='edit timeline'
						icon={<EditIcon color='white' />}
						colorScheme='yellow'
						rounded='full'
						onClick={() => onOpen()}
					/>
					<IconButton
						aria-label='delete timeline'
						icon={<DeleteIcon />}
						colorScheme='red'
						rounded='full'
						onClick={() => setIsOpen(true)}
					/>
				</Stack>
				<Stack isInline justify='center' align='center' mt={4} spacing={0}>
					<FormLabel>Publish Timeline?</FormLabel>
					<Switch
						colorScheme='purple'
						value={timeline.published}
						onChange={() => console.log(timeline.published)}
					/>
				</Stack>
				<Flex justify='space-between'>
					<Badge colorScheme={timeline.published ? 'green' : 'red'}>
						{timeline.published ? 'Published' : 'Not Published'}
					</Badge>
				</Flex>
			</MotionBox>

			{/* Are you sure - delete timeline */}
			<AlertDialog
				isOpen={alertOpen}
				leastDestructiveRef={cancelRef}
				onClose={alertClose}
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader fontboxSize='lg' fontWeight='bold'>
						Delete Timeline
					</AlertDialogHeader>

					<AlertDialogBody>
						Are you sure? You can't undo this action afterwards.
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={alertClose}>
							Cancel
						</Button>
						<Button
							colorScheme='red'
							onClick={() => delTimeline(timeline._id)}
							ml={3}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Edit Timeline Details Modal */}
			<Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Timeline</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validate={validate}
						>
							{({
								handleSubmit,
								errors,
								values,
								setFieldValue,
							}: FormikProps<EditTimelineValues>) => (
								<Form onSubmit={handleSubmit}>
									<Stack spacing={6}>
										<FormControl isInvalid={Boolean(errors.title)} isRequired={true}>
											<FormLabel htmlFor='title'>Title</FormLabel>
											<InputGroup>
												<Input
													type='text'
													id='title'
													aria-describedby='userame-helper-text'
													value={values.title}
													onChange={(e) => setFieldValue('title', e.target.value)}
												/>
											</InputGroup>
											{errors.title && (
												<FormErrorMessage mt={3}>{errors.title} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl
											isInvalid={Boolean(errors.description)}
											isRequired={true}
										>
											<FormLabel htmlFor='title'>Description</FormLabel>
											<InputGroup>
												Description
												<Input
													pr='4.5rem'
													id='description'
													value={values.description}
													onChange={(e) => setFieldValue('description', e.target.value)}
													type='text'
												/>
											</InputGroup>
											{errors.description && (
												<FormErrorMessage mt={3}>{errors.description}</FormErrorMessage>
											)}
										</FormControl>
									</Stack>
									<FormButtonWrapper style={{ marginBottom: '20px' }}>
										<Button
											colorScheme='blue'
											variant='solid'
											mr={5}
											onClick={() => onClose()}
										>
											Close
										</Button>
										<Button
											isLoading={isSubmitting}
											rightIcon={<CheckIcon />}
											colorScheme='green'
											type='submit'
											variant='solid'
										>
											Save Changes
										</Button>
									</FormButtonWrapper>
								</Form>
							)}
						</Formik>
					</ModalBody>
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
