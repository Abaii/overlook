import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useToast,
	Text,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useAuth } from '../../utils/auth/AuthContext';
import LoginModal, { LoginFullPage } from '../Auth/Login/Login';

export default function AccountModal({ isOpen, onClose }) {
	const { user } = useAuth();
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [reAuth, setReAuth] = useState(false);
	const [show, setShow] = useState(false);
	const toast = useToast();

	const handleClick = () => setShow(!show);

	function checkEmail() {
		if (
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				newEmail
			)
		) {
			return true;
		} else {
			return false;
		}
	}

	function newCreds() {
		if (newPassword != '' && newPassword.length >= 5 && checkEmail() == true) {
			// Changing Both
			console.log('New Email Address - ' + newEmail);
			console.log('New Password - ' + newPassword);
		} else if (checkEmail() == true) {
			// Only changing the email
			user
				.updateEmail(newEmail)
				.then((response) => {
					modalClose();
					toast({
						title: 'Successfully Updated e-mail',
						description: `Your account's e-mail address was succesfully changed to ${newEmail}`,
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'top',
					});
				})
				.catch((err) => {
					console.log(err);

					toast({
						title: 'Error Occurred',
						description: err.message,
						status: 'error',
						duration: 3000,
						isClosable: true,
						position: 'top',
					});
				});
		} else if (newPassword != '' && newPassword.length >= 5) {
			// Only Changing the password
			console.log('New Password - ' + newPassword);
			user
				.updatePassword(newPassword)
				.then((response) => {
					modalClose();
					toast({
						title: 'Successfully Updated password',
						description: `Your account's password was succesfully updated.`,
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'top',
					});
				})
				.catch((err) => {
					console.log(err);
					toast({
						title: 'Error Occurred',
						description: err.message,
						status: 'error',
						duration: 3000,
						isClosable: true,
						position: 'top',
					});
				});
		}
	}

	function EditableControls({ onRequestEdit }) {
		return (
			<Flex justify='center' mt={2}>
				<IconButton
					boxSize='sm'
					icon={<EditIcon />}
					aria-label='edit value button'
					onClick={onRequestEdit}
				/>
			</Flex>
		);
	}

	const modalClose = () => {
		setNewEmail('');
		setNewPassword('');
		onClose();
	};

	const confirmReAuth = () => {
		setReAuth(true);
	};

	return (
		<>
			{user && (
				<Modal
					isOpen={isOpen}
					onClose={() => {
						modalClose();
					}}
				>
					<ModalOverlay />

					<ModalContent>
						<ModalHeader>Account Settings</ModalHeader>
						<ModalCloseButton />

						{reAuth ? (
							<>
								<ModalBody>
									<Stack spacing={2}>
										<Box textAlign='center'>
											<Heading size='lg' mb={2}>
												e-mail
											</Heading>
											<Divider />

											<Editable
												placeholder={'Current e-mail address - ' + user.email}
												textAlign='center'
												isPreviewFocusable={false}
												selectAllOnFocus={true}
												onSubmit={(value) => setNewEmail(value)}
											>
												{(props) => (
													<>
														<EditablePreview />
														<EditableInput />
														{/* <EditableControls {...props} /> */}
													</>
												)}
											</Editable>
										</Box>
										<Box textAlign='center'>
											<Heading size='lg' mb={2}>
												password
											</Heading>
											<InputGroup size='md'>
												<Input
													pr='4.5rem'
													id='password'
													onChange={(value) => setNewPassword(value.target.value)}
													type={show ? 'text' : 'password'}
													placeholder='Enter password'
												/>
												<InputRightElement width='4.5rem'>
													<Button h='1.75rem' size='sm' onClick={handleClick}>
														{show ? 'Hide' : 'Show'}
													</Button>
												</InputRightElement>
											</InputGroup>
										</Box>
									</Stack>
								</ModalBody>

								<ModalFooter textAlign='center'>
									<Button
										colorScheme='blue'
										mr={3}
										onClick={() => {
											modalClose();
										}}
									>
										Close
									</Button>
									<Button variant='solid' colorScheme='green' onClick={newCreds}>
										Save Changes
									</Button>
								</ModalFooter>
							</>
						) : (
							<Flex align='center' justify='center' flexDirection='column'>
								<Text color='tomato'>You must re-login to view account details</Text>
								<LoginFullPage setReAuth={confirmReAuth} />
							</Flex>
						)}
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
