import React, { useState } from 'react';

// Chakra Components
import {
	Box,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Button,
	FormErrorMessage,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	FormControl,
	Stack,
	Link,
	Text,
	Input,
	Textarea,
	useToast,
} from '@chakra-ui/core';

// Formik Imports
import { Formik, FormikErrors, FormikProps, FormikValues, Form } from 'formik';
import { FormButtonWrapper } from './Timeline.styles';

// Other Imports
import axios from 'axios';
import nookies from 'nookies';
import { useAuth } from '../../utils/auth/AuthContext';
import { useRouter } from 'next/router';

interface TimelineValues {
	title: string;
	description: string;
}

const initialValues = {
	title: 'test title 5',
	description: 'this is a description...',
};

export const TimelineModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user } = useAuth();
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const toast = useToast();

	const handleSubmit = async ({ title, description }: TimelineValues) => {
		setSubmitting(true);

		const token = nookies.get({}, 'token');

		const response = await axios({
			method: 'post',
			url: 'http://localhost:8080/api/timelines',
			data: {
				title: title,
				description: description,
				ownerId: user.uid,
			},
			headers: { Authorization: 'Bearer ' + token.token },
		})
			.then(() => {
				toast({
					title: 'Timeline Created',
					description: 'Successfully created Timeline.',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
				setSubmitting(false);
				onClose();
				router.reload();
			})
			.catch((err) => {
				setSubmitting(false);
				const errorCode = err.code;
				const errorMessage = err.message;
				toast({
					title: errorCode,
					description: errorMessage,
					status: 'error',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
			});

		console.log(response);
	};

	const validate = ({ title, description }: TimelineValues) => {
		const errors: FormikErrors<TimelineValues> = {};

		if (!title) {
			errors.title = 'You must enter a Title for this Timeline!';
		}

		if (!description) {
			errors.description = 'Please provide a short description for your Timeline.';
		}

		return errors;
	};

	return (
		<>
			<IconButton
				icon='add'
				variantColor='green'
				isRound={true}
				aria-label='Create Timeline Button'
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create a Timeline</ModalHeader>
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
							}: FormikProps<TimelineValues>) => (
								<Form onSubmit={handleSubmit}>
									<Stack spacing={6}>
										<FormControl isInvalid={Boolean(errors.title)}>
											<InputGroup>
												<InputLeftAddon children='Title' />
												<Input
													type='text'
													id='Title'
													placeholder='Enter a Title for this Timeline'
													aria-describedby='timeline title input box'
													value={values.title}
													onChange={(e) => setFieldValue('title', e.target.value)}
												/>
											</InputGroup>
											{errors.title && (
												<FormErrorMessage style={{ paddingTop: '12px' }}>
													{errors.title}{' '}
												</FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.description)}>
											<InputGroup size='md'>
												<Textarea
													id='description'
													value={values.description}
													onChange={(e) => setFieldValue('description', e.target.value)}
													placeholder='Enter a description for this Timeline'
												/>
											</InputGroup>
											{errors.description && (
												<FormErrorMessage style={{ paddingTop: '12px' }}>
													{errors.description}
												</FormErrorMessage>
											)}
										</FormControl>
									</Stack>
									<FormButtonWrapper>
										<Button
											isLoading={isSubmitting}
											rightIcon='check'
											variantColor='green'
											type='submit'
											variant='solid'
										>
											Create Timeline
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
};

export default TimelineModal;
