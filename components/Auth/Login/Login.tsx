import React, { useState } from 'react';
import {
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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	ModalFooter,
	useToast,
	IconButton,
	Box,
	ButtonGroup,
	Flex,
} from '@chakra-ui/core';
import { Formik, FormikErrors, FormikProps, FormikValues, Form } from 'formik';
import { FormButtonWrapper, ModalFooterWrapper } from './Login.styles';
import { LinkHoverWrapper } from '../../SharedComponents.styles';
import initFirebase from '../../../utils/auth/initFirebase';
import firebase from 'firebase';
import router from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook2 } from 'react-icons/im';
import { Icon } from '../../Navbar/Logo/Logo.styles';

initFirebase();

interface LoginValues {
	username: string;
	password: string;
}

interface LoginProps {
	linkText?: string;
	closeRegister?: () => void;
}

const initialValues = {
	username: 'johndoe@gmail.com',
	password: 'test123',
};

const Login = ({ linkText = 'Login' }: LoginProps) => {
	const { onOpen } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const [showModal, setShowModal] = useState(true);
	const [isSubmitting, setSubmitting] = useState(false);
	const toast = useToast();

	const handleSubmit = ({ username, password }: LoginValues) => {
		setSubmitting(true);
		firebase
			.auth()
			.signInWithEmailAndPassword(username, password)
			.then(() => {
				setSubmitting(false);
				toast({
					title: 'Logged In',
					description: 'Logged In successfully.',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});

				router.push('/');
			})
			.catch((error) => {
				setSubmitting(false);
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

	const googleLogin = () => {
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential;
				// The signed-in user info.
				var user = result.user;
				// ...
				toast({
					title: 'Google Account Linked',
					description: 'Account created and logged In successfully.',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});

				router.push('/');
			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
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

	const facebookLogin = () => {
		var provider = new firebase.auth.FacebookAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				var token = result.credential;
				// The signed-in user info.
				var user = result.user;

				toast({
					title: 'Facebook Account Linked',
					description: 'Account created and logged In successfully.',
					status: 'success',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});

				router.push('/');
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
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

	const validate = (values: LoginValues) => {
		const errors: FormikErrors<LoginValues> = {};
		console.log(values);
		if (!values.username) {
			errors.username = 'You must enter a username';
		}

		if (!values.password) {
			errors.password = 'You must enter your password';
		}

		return errors;
	};

	return (
		<>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login!</ModalHeader>
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
							}: FormikProps<LoginValues>) => (
								<Form onSubmit={handleSubmit}>
									<Stack spacing={6}>
										<Stack spacing={6}>
											<Button
												onClick={googleLogin}
												style={{ fontFamily: 'Roboto' }}
												aria-label='google sign-in'
											>
												<Box as={FcGoogle} size='30px' style={{ marginRight: '18px' }} />
												Sign In With Google
											</Button>
											<Button
												onClick={facebookLogin}
												style={{ fontFamily: 'Roboto' }}
												aria-label='facebook sign-in'
											>
												<Box
													as={ImFacebook2}
													size='26px'
													style={{ color: '#3b5998', marginRight: '18px' }}
												/>
												Sign In With Facebook
											</Button>
										</Stack>
										<FormControl isInvalid={Boolean(errors.username)}>
											<InputGroup>
												<InputLeftAddon children='Username' />
												<Input
													type='text'
													id='username'
													placeholder='Enter your username'
													aria-describedby='userame-helper-text'
													value={values.username}
													onChange={(e) => setFieldValue('username', e.target.value)}
												/>
											</InputGroup>
											{errors.username && (
												<FormErrorMessage>{errors.username} </FormErrorMessage>
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
											Log In
										</Button>
									</FormButtonWrapper>
								</Form>
							)}
						</Formik>
					</ModalBody>
					<ModalFooter>
						<ModalFooterWrapper>
							<Text>
								Don't have an account? <Link href='/register'>Click here</Link>
							</Text>
						</ModalFooterWrapper>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default Login;
