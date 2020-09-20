import React, { useState } from 'react';
import {
	Button,
	Flex,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	FormHelperText,
	FormControl,
	Stack,
	Text,
	Link,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/core';
import { Formik, FormikErrors, FormikProps, FormikValues, Form } from 'formik';
import { FormButtonWrapper } from './Login.styles';
import { FormWrapper } from '../Registration/Registration.styles';

interface LoginValues {
	username: string;
	password: string;
}

interface LoginProps extends FormikProps<LoginValues> {}

const initialValues = {
	username: '',
	password: '',
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

const Login = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<>
			<Link onClick={onOpen}>Login</Link>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={initialValues}
							onSubmit={(values) => console.log(values)}
							validate={validate}
						>
							{({
								handleSubmit,
								errors,
								values,
								setFieldValue,
								isSubmitting,
							}: FormikProps<LoginValues>) => (
								<Form onSubmit={handleSubmit}>
									<Stack spacing={8}>
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
											variantColor='green'
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
				</ModalContent>
			</Modal>
		</>
	);
};
export default Login;
