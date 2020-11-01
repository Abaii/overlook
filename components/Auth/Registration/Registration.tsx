import React, { useState } from 'react';
import {
	Button,
	FormErrorMessage,
	Stack,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	Text,
	useToast,
	useDisclosure,
	Box,
	Flex,
} from '@chakra-ui/core';
import { Formik, Form, FormikProps, FormikErrors } from 'formik';
import { FormButtonWrapper } from './Registration.styles';
import { ModalFooterWrapper } from '../Login/Login.styles';
import firebase from 'firebase';
import initFirebase from '../../../utils/auth/initFirebase';
import router from 'next/router';
import ProviderButtons from '../ProviderButtons';

initFirebase();

//Define Register form input types
interface RegisterValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface RegisterProps extends FormikProps<RegisterValues> {}

const initialValues = {
	firstName: 'john',
	lastName: 'doe',
	email: 'johndoe3@gmail.com',
	password: 'test123',
};

interface RegistrationProps {
	linkText?: string;
}

const RegistrationModal = ({ linkText = 'Register' }: RegistrationProps) => {
	// Modal specific hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const toast = useToast();

	//Take the types that register will require - first/last name + email + password
	const validate = (values: RegisterValues) => {
		const errors: FormikErrors<RegisterValues> = {};
		console.log(values);

		//Check that all values exist and if not present a error message
		if (!values.email) {
			errors.email = 'You must enter an email';
		}

		if (!values.firstName) {
			errors.firstName = 'You must enter a first name';
		}

		if (!values.lastName) {
			errors.lastName = 'You must enter a last name';
		}

		if (!values.password) {
			errors.password = 'You must enter a password';
		}

		return errors;
	};

	const handleSubmit = ({ email, password }: RegisterValues) => {
		const promise = firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				toast({
					title: 'Account Created',
					description: 'Account has been created successfully',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});

				router.push('/');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				toast({
					title: errorCode,
					description: errorMessage,
					status: 'error',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
			});
	};

	return (
		<>
			<Link onClick={onOpen}>{linkText}</Link>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Register!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validate={validate}
						>
							{({
								errors,
								values,
								setFieldValue,
								isSubmitting,
							}: FormikProps<RegisterValues>) => (
								<Form>
									<Stack spacing={8}>
										<ProviderButtons bgColor='gray.100' />
										<FormControl
											isInvalid={Boolean(errors.email)}
											style={{ marginTop: '25px' }}
										>
											<InputGroup>
												<InputLeftAddon children='First Name' />
												<Input
													roundedLeft='0'
													name='firstName'
													id='firstName'
													placeholder='John'
													aria-describedby='first-name-helper-text'
													value={values.firstName}
													onChange={(e) => setFieldValue('firstName', e.target.value)}
												/>
											</InputGroup>
											{errors.firstName && (
												<FormErrorMessage>{errors.firstName} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.lastName)}>
											<InputGroup>
												<InputLeftAddon children='Last Name' />
												<Input
													roundedLeft='0'
													name='lastName'
													id='lastName'
													placeholder='Doe'
													value={values.lastName}
													onChange={(e) => setFieldValue('lastName', e.target.value)}
												/>
											</InputGroup>
											{errors.lastName && (
												<FormErrorMessage>{errors.lastName} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.email)}>
											<InputGroup>
												<InputLeftAddon children='Email' />
												<Input
													roundedLeft='0'
													name='email'
													id='email'
													placeholder='Email'
													value={values.email}
													onChange={(e) => setFieldValue('email', e.target.value)}
												/>
											</InputGroup>
											{errors.email && (
												<FormErrorMessage>{errors.email} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.password)}>
											<InputGroup size='md'>
												<InputLeftAddon children='Password' />
												<Input
													pr='4.5rem'
													id='password'
													value={values.password}
													onChange={(e) => setFieldValue('password', e.target.value)}
													type={show ? 'text' : 'password'}
													placeholder='Enter password'
												/>
												<InputRightElement width='4.5rem'>
													<Button h='1.75rem' size='sm' onClick={handleClick}>
														{show ? 'Hide' : 'Show'}
													</Button>
												</InputRightElement>
											</InputGroup>
											{errors.password && (
												<FormErrorMessage>{errors.password}</FormErrorMessage>
											)}
										</FormControl>
									</Stack>
									<FormButtonWrapper>
										<Button
											isLoading={isSubmitting}
											rightIcon='arrow-forward'
											variantColor='purple'
											type='submit'
											variant='solid'
										>
											Submit
										</Button>
									</FormButtonWrapper>
								</Form>
							)}
						</Formik>
					</ModalBody>
					<ModalFooter>
						<ModalFooterWrapper>
							<Text>
								Already have an account? <Link href='/login'>Click here</Link>
							</Text>
						</ModalFooterWrapper>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export const RegistrationFullPage = () => {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const toast = useToast();

	//Take the types that register will require - first/last name + email + password
	const validate = (values: RegisterValues) => {
		const errors: FormikErrors<RegisterValues> = {};
		console.log(values);

		//Check that all values exist and if not present a error message
		if (!values.email) {
			errors.email = 'You must enter an email';
		}

		if (!values.firstName) {
			errors.firstName = 'You must enter a first name';
		}

		if (!values.lastName) {
			errors.lastName = 'You must enter a last name';
		}

		if (!values.password) {
			errors.password = 'You must enter a password';
		}

		return errors;
	};

	const handleSubmit = ({ email, password }: RegisterValues) => {
		const promise = firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				toast({
					title: 'Account Created',
					description: 'Account has been created successfully',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});

				router.push('/');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				toast({
					title: errorCode,
					description: errorMessage,
					status: 'error',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
			});
	};

	return (
		<Box w='100%' p={10} width='fit-content'>
			<Flex align='center' justify='center' bg='white' rounded='lg' p={5}>
				<Stack spacing={6}>
					<ProviderButtons bgColor='gray.100' />
					<Box w='100%' p={5}>
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validate={validate}
						>
							{({
								errors,
								values,
								setFieldValue,
								isSubmitting,
							}: FormikProps<RegisterValues>) => (
								<Form>
									<Text fontSize='35px' fontWeight='bold' textAlign='center'>
										Register
									</Text>
									<Stack spacing={8}>
										<FormControl
											isInvalid={Boolean(errors.email)}
											style={{ marginTop: '20px' }}
										>
											<InputGroup>
												<InputLeftAddon children='First Name' />
												<Input
													roundedLeft='0'
													name='firstName'
													id='firstName'
													placeholder='John'
													aria-describedby='first-name-helper-text'
													value={values.firstName}
													onChange={(e) => setFieldValue('firstName', e.target.value)}
												/>
											</InputGroup>
											{errors.firstName && (
												<FormErrorMessage>{errors.firstName} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.lastName)}>
											<InputGroup>
												<InputLeftAddon children='Last Name' />
												<Input
													roundedLeft='0'
													name='lastName'
													id='lastName'
													placeholder='Doe'
													value={values.lastName}
													onChange={(e) => setFieldValue('lastName', e.target.value)}
												/>
											</InputGroup>
											{errors.lastName && (
												<FormErrorMessage>{errors.lastName} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.email)}>
											<InputGroup>
												<InputLeftAddon children='Email' />
												<Input
													roundedLeft='0'
													name='email'
													id='email'
													placeholder='Email'
													value={values.email}
													onChange={(e) => setFieldValue('email', e.target.value)}
												/>
											</InputGroup>
											{errors.email && (
												<FormErrorMessage>{errors.email} </FormErrorMessage>
											)}
										</FormControl>

										<FormControl isInvalid={Boolean(errors.password)}>
											<InputGroup size='md'>
												<InputLeftAddon children='Password' />
												<Input
													pr='4.5rem'
													id='password'
													value={values.password}
													onChange={(e) => setFieldValue('password', e.target.value)}
													type={show ? 'text' : 'password'}
													placeholder='Enter password'
												/>
												<InputRightElement width='4.5rem'>
													<Button h='1.75rem' size='sm' onClick={handleClick}>
														{show ? 'Hide' : 'Show'}
													</Button>
												</InputRightElement>
											</InputGroup>
											{errors.password && (
												<FormErrorMessage>{errors.password}</FormErrorMessage>
											)}
										</FormControl>
									</Stack>
									<FormButtonWrapper>
										<Button
											isLoading={isSubmitting}
											rightIcon='arrow-forward'
											variantColor='purple'
											type='submit'
											variant='solid'
										>
											Submit
										</Button>
									</FormButtonWrapper>
								</Form>
							)}
						</Formik>
					</Box>
					<Flex align='center' justify='center'>
						<Text>
							Already have an account? <Link href='/login'>Click here</Link>
						</Text>
					</Flex>
				</Stack>
			</Flex>
		</Box>
	);
};

export default RegistrationModal;
