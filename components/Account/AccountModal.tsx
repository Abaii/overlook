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
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useToast,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { useAuth } from '../../utils/auth/AuthContext';

export default function AccountModal({ isOpen, onClose }) {
	const { user } = useAuth();
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
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
			console.log('New Email Address - ' + newEmail);
			user
				.updateEmail(newEmail)
				.then((response) => {
					modalClose();
					toast({
						title: 'Successfully changed e-mail',
						description: `Your account's e-mail address was succesfully changed to ${newEmail}`,
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'top',
					});
				})
				.catch((err) => {
					toast({
						title: 'Error Occured',
						description:
							'An error occured while trying to change your e-mail address',
						status: 'error',
						duration: 3000,
						isClosable: true,
						position: 'top',
					});
					console.error(err);
				});
		} else if (newPassword != '' && newPassword.length >= 5) {
			// Only Changing the password
			console.log('New Password - ' + newPassword);
		}
	}

	function EditableControls({ onRequestEdit }) {
		return (
			<Flex justify='center' mt={2}>
				<IconButton
					size='sm'
					icon='edit'
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
						<ModalBody>
							<Stack spacing={2}>
								<Box textAlign='center'>
									<Heading size='md'>e-mail</Heading>
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
												<EditableControls {...props} />
											</>
										)}
									</Editable>
								</Box>
								<Box textAlign='center'>
									<Heading size='md'>password</Heading>
									<Divider />
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
								variantColor='blue'
								mr={3}
								onClick={() => {
									modalClose();
								}}
							>
								Close
							</Button>
							<Button variant='solid' variantColor='green' onClick={newCreds}>
								Save Changes
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
