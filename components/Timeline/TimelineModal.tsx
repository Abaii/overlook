import React, { useState } from "react";

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
} from "@chakra-ui/react";

// Formik Imports
import { Formik, FormikErrors, FormikProps, FormikValues, Form } from "formik";
import { FormButtonWrapper } from "./Timeline.styles";

// Other Imports
import axios from "axios";
import nookies from "nookies";
import { useAuth } from "../../utils/auth/AuthContext";
import { useRouter } from "next/router";
import { Icon } from "../Navbar/Logo/Logo.styles";
import { ImFilePicture, ImOffice } from "react-icons/im";
import { BsCodeSlash } from "react-icons/bs";
import { motion } from "framer-motion";
import { AddIcon, CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";

interface TimelineValues {
	title: string;
	description: string;
}

interface TimelineModalProps {
	addTimeline?: (timeline: object) => void;
}

const initialValues = {
	title: "",
	description: "",
};

export const TimelineModal = ({ addTimeline }: TimelineModalProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user } = useAuth();
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const toast = useToast();
	const [selectedImage, setSelectedImage] = useState();
	const [selectedImages, setSelectedImages] = useState([]);

	const [uploadedImage, setUploadedImage] = useState();
	const [uploadedImages, setUploadedImages] = useState([]);

	const token = nookies.get({}, "token");

	const handleSubmit = async ({ title, description }: TimelineValues) => {
		setSubmitting(true);

		// No Files
		if (selectedImage === undefined && selectedImages.length === 0) {
			const response = axios({
				method: "post",
				url: "http://localhost:8080/api/timelines",
				data: {
					title: title,
					description: description,
					ownerId: user.uid,
				},
				headers: { Authorization: "Bearer " + token.token },
			})
				.then((resp) => {
					toast({
						title: "Timeline Created",
						description: "Successfully created Timeline.",
						status: "success",
						duration: 3000,
						isClosable: true,
						position: "top",
					});
					setSubmitting(false);
					addTimeline(resp.data);
					onClose();
				})
				.catch((err) => {
					setSubmitting(false);
					const errorCode = err.code;
					const errorMessage = err.message;
					toast({
						title: errorCode,
						description: errorMessage,
						status: "error",
						duration: 4000,
						isClosable: true,
						position: "top",
					});
				});
		} else if (selectedImage) {
			// One Image Upload
			const formData = new FormData();
			formData.append("image", selectedImage);
			await axios
				.post("http://localhost:8080/api/timelines/image", formData, {
					headers: {
						Authorization: "Bearer " + token.token,
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					setUploadedImage(res.data.data.location);

					console.log("Image Location -", res.data.data.location);

					const response = axios({
						method: "post",
						url: "http://localhost:8080/api/timelines",
						data: {
							title: title,
							description: description,
							ownerId: user.uid,
							content: [
								{
									image_url: res.data.data.location,
									comments: [],
								},
							],
						},
						headers: { Authorization: "Bearer " + token.token },
					})
						.then((resp) => {
							toast({
								title: "Timeline Created",
								description: "Successfully created Timeline.",
								status: "success",
								duration: 4000,
								isClosable: true,
								position: "top",
							});
							setSubmitting(false);
							addTimeline(resp.data);
							onClose();
						})
						.catch((err) => {
							setSubmitting(false);
							const errorCode = err.code;
							const errorMessage = err.message;
							toast({
								title: errorCode,
								description: errorMessage,
								status: "error",
								duration: 4000,
								isClosable: true,
								position: "top",
							});
						});
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (selectedImages) {
			// More than one image file
			const formData = new FormData();
			selectedImages.forEach((file) => {
				formData.append("image", file);
			});
			await axios
				.post("http://localhost:8080/api/timelines/image", formData, {
					headers: {
						Authorization: "Bearer " + token.token,
						"Content-Type": "multipart/form-data",
					},
				})
				.then(async (res) => {
					setUploadedImages(res.data.data);

					var uploadContent = res.data.data.map((file) => ({
						image_url: file.Location,
						comments: [],
					}));

					const response = await axios({
						method: "post",
						url: "http://localhost:8080/api/timelines",
						data: {
							title: title,
							description: description,
							ownerId: user.uid,
							content: uploadContent,
						},
						headers: { Authorization: "Bearer " + token.token },
					})
						.then((resp) => {
							toast({
								title: "Timeline Created",
								description: "Successfully created Timeline.",
								status: "success",
								duration: 4000,
								isClosable: true,
								position: "top",
							});
							setSubmitting(false);
							addTimeline(resp.data);
							onClose();
						})
						.catch((err) => {
							setSubmitting(false);
							const errorCode = err.code;
							const errorMessage = err.message;
							toast({
								title: errorCode,
								description: errorMessage,
								status: "error",
								duration: 4000,
								isClosable: true,
								position: "top",
							});
						});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const validate = ({ title, description }: TimelineValues) => {
		const errors: FormikErrors<TimelineValues> = {};

		if (!title) {
			errors.title = "You must enter a Title for this Timeline!";
		}

		if (!description) {
			errors.description =
				"Please provide a short description for your Timeline.";
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
	};

	const modalClose = () => {
		setSelectedImage(undefined);
		setSelectedImages([]);
	};

	const MotionIconButton = motion.custom(IconButton);

	return (
		<>
			<MotionIconButton
				icon={<AddIcon />}
				colorScheme='green'
				isRound={true}
				aria-label='Create Timeline Button'
				onClick={onOpen}
				whileHover={{ scale: 1.1 }}
			/>

			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					modalClose();
				}}
				size='xl'
				closeOnOverlayClick={false}
			>
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
										<FormControl
											isInvalid={Boolean(errors.title)}
											isRequired={true}
										>
											<FormLabel>Title</FormLabel>
											<InputGroup>
												<Input
													type='text'
													id='Title'
													placeholder='Enter a Title for this Timeline'
													aria-describedby='timeline title input box'
													variant='filled'
													value={values.title}
													onChange={(e) =>
														setFieldValue(
															"title",
															e.target.value
														)
													}
												/>
											</InputGroup>
											{errors.title && (
												<FormErrorMessage
													style={{
														paddingTop: "12px",
													}}
												>
													{errors.title}
												</FormErrorMessage>
											)}
										</FormControl>
										<FormControl
											isInvalid={Boolean(
												errors.description
											)}
											isRequired={true}
										>
											<FormLabel>Description</FormLabel>
											<InputGroup>
												<Textarea
													id='description'
													value={values.description}
													variant='filled'
													onChange={(e) =>
														setFieldValue(
															"description",
															e.target.value
														)
													}
													placeholder='Enter a description for this Timeline'
													height='200px'
												/>
											</InputGroup>
											{errors.description && (
												<FormErrorMessage
													style={{
														paddingTop: "12px",
													}}
												>
													{errors.description}
												</FormErrorMessage>
											)}
										</FormControl>
										<FormControl>
											<FormLabel>
												Image Upload - Optional
											</FormLabel>
											<Box
												rounded='lg'
												bg='gray.100'
												p={2}
											>
												<input
													onChange={handleImageChange}
													accept='.jpg, .png, .jpeg'
													type='file'
													multiple={true}
												/>

												{selectedImage && (
													<Flex
														justify='center'
														align='center'
														mt={2}
													>
														<Image
															p={2}
															boxSize='50%'
															src={URL.createObjectURL(
																selectedImage
															)}
															// Creates a preview of the image being selected
														/>
													</Flex>
												)}

												<Flex
													justify='center'
													align='center'
													mt={2}
													flexDirection='row'
													flexWrap='wrap'
												>
													{selectedImages &&
														selectedImages.map(
															(image) => (
																<Image
																	p={2}
																	boxSize='50%'
																	src={URL.createObjectURL(
																		image
																	)}
																/>
															)
														)}
												</Flex>

												{uploadedImage && (
													<Flex
														justify='center'
														align='center'
														mt={2}
													>
														<Image
															p={2}
															boxSize='50%'
															src={uploadedImage}
														/>
													</Flex>
												)}
											</Box>
										</FormControl>
										{/* TODO: Read into https://chakra-ui.com/radio#custom-radio-buttons */}
										{/* <FormControl>
											<FormLabel>Timeline Type</FormLabel>
											<RadioGroup>
												<Radio as={ImFilePicture}></Radio>
											</RadioGroup>
										</FormControl> */}
									</Stack>
									<Flex
										justify='center'
										align='center'
										my={5}
									>
										<Button
											isLoading={isSubmitting}
											rightIcon={<CheckIcon />}
											colorScheme='green'
											type='submit'
											variant='solid'
										>
											Create Timeline
										</Button>
									</Flex>
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
