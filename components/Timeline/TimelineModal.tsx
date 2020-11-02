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
	Image,
	Textarea,
	useToast,
	Tooltip,
	ControlBox,
	VisuallyHidden,
	FormLabel,
	RadioGroup,
	Radio,
	Flex,
} from '@chakra-ui/core';

// Formik Imports
import { Formik, FormikErrors, FormikProps, FormikValues, Form } from 'formik';
import { FormButtonWrapper } from './Timeline.styles';

// Other Imports
import axios from 'axios';
import nookies from 'nookies';
import { useAuth } from '../../utils/auth/AuthContext';
import { useRouter } from 'next/router';
import { Icon } from '../Navbar/Logo/Logo.styles';
import { ImFilePicture, ImOffice } from 'react-icons/im';
import { BsCodeSlash } from 'react-icons/bs';

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
	const [selectedImage, setSelectedImage] = useState();
	const [selectedImages, setSelectedImages] = useState([]);
	const token = nookies.get({}, 'token');

	const handleSubmit = async ({ title, description }: TimelineValues) => {
		setSubmitting(true);

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

	const handleImageChange = (event) => {
		if (event.target.files.length == 1) {
			setSelectedImage(event.target.files[0]);
			setSelectedImages([]);
		} else {
			const files = [...event.target.files];
			setSelectedImages(files);
			setSelectedImage(undefined);
		}
		// Send image off to image api point before creating timeline.
	};

	const handleImageUpload = () => {
		if (!selectedImage && selectedImages == []) {
			return;
		}

		if (selectedImage) {
			console.log('Single File Upload');
			const formData = new FormData();
			formData.append('image', selectedImage);
			axios
				.post('http://localhost:8080/api/timelines/image', formData, {
					headers: {
						Authorization: 'Bearer ' + token.token,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (selectedImages) {
			console.log('Multiple File Upload');
			const formData = new FormData();
			selectedImages.forEach((file) => {
				formData.append('image', file);
			});
			axios
				.post('http://localhost:8080/api/timelines/image', formData, {
					headers: {
						Authorization: 'Bearer ' + token.token,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<>
			<Tooltip label='Create a Timeline' aria-label='create a timeline button'>
				<IconButton
					icon='add'
					variantColor='green'
					isRound={true}
					aria-label='Create Timeline Button'
					onClick={onOpen}
				/>
			</Tooltip>

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
										<FormControl>
											<FormLabel>Image Upload</FormLabel>
											<Box rounded='lg' bg='gray.100' p={2}>
												<input
													onChange={handleImageChange}
													accept='.jpg, .png, .jpeg'
													type='file'
													multiple={true}
												/>
												{selectedImage && (
													<Flex justify='center' align='center'>
														<Image
															p={2}
															size='50%'
															src={URL.createObjectURL(selectedImage)}
															// Creates a preview of the image being selected
														/>
													</Flex>
												)}
												{selectedImages &&
													selectedImages.map((image) => (
														<>
															<Image p={2} size='50%' src={URL.createObjectURL(image)} />
														</>
													))}
											</Box>
										</FormControl>
										<FormButtonWrapper>
											<Button variantColor='purple' onClick={handleImageUpload}>
												Upload Image
											</Button>
										</FormButtonWrapper>
										{/* TODO: Read into https://chakra-ui.com/radio#custom-radio-buttons */}
										{/* <FormControl>
											<FormLabel>Timeline Type</FormLabel>
											<RadioGroup>
												<Radio as={ImFilePicture}></Radio>
											</RadioGroup>
										</FormControl> */}
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
