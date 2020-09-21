import React, { useEffect } from 'react';
import {
	Button,
	Flex,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Stack,
	Input,
	Icon,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	InputRightElement,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	Divider,
} from '@chakra-ui/core';
import ReactDOM from 'react-dom';
import {
	Formik,
	Form,
	useField,
	useFormikContext,
	FormikHelpers,
	FormikProps,
	FormikErrors,
	Field,
} from 'formik';
import * as Yup from 'yup';
import { FormWrapper, FormButtonWrapper } from './Registration.styles';

//Define Register form input types
interface RegisterValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface RegisterProps extends FormikProps<RegisterValues> {}

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};

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

const Registration = (props) => {
	return (
		<>
			<SignupForm></SignupForm>
		</>
	);
};

export const SignupForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<>
			<Link onClick={onOpen}>Register</Link>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Register!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={initialValues}
							onSubmit={(values) => console.log(values)}
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
										<FormControl isInvalid={Boolean(errors.email)}>
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
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Registration;
