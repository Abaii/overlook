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
} from '@chakra-ui/core';
import ReactDOM from 'react-dom';
import {
	Formik,
	Form,
	useField,
	useFormikContext,
	FormikHelpers,
	Field,
} from 'formik';
import * as Yup from 'yup';
import { FormWrapper, FormButtonWrapper } from './Registration.styles';

interface Values {
	firstName: string;
	lastName: string;
	email: string;
}

const Registration = (props) => {
	return (
		<>
			<SignupForm></SignupForm>
		</>
	);
};

export const SignupForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
							initialValues={{
								firstName: '',
								lastName: '',
								email: '',
							}}
							onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));
									setSubmitting(false);
								}, 500);
							}}
						>
							<Form>
								<Stack spacing={8}>
									<FormControl>
										<InputGroup>
											<InputLeftAddon children='First Name' />
											<Input
												roundedLeft='0'
												name='firstName'
												id='firstName'
												placeholder='John'
											/>
										</InputGroup>
									</FormControl>

									<InputGroup>
										<InputLeftAddon children='Last Name' />
										<Input
											roundedLeft='0'
											name='lastName'
											id='lastName'
											placeholder='Doe'
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement children={<Icon name='email' color='gray.300' />} />
										<Input type='email' placeholder='Email' />
									</InputGroup>
								</Stack>
								<FormButtonWrapper>
									<Button
										rightIcon='arrow-forward'
										variantColor='green'
										type='submit'
										variant='solid'
									>
										Submit
									</Button>
								</FormButtonWrapper>
							</Form>
						</Formik>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Registration;
