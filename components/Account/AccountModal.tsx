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
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { useAuth } from '../../utils/auth/AuthContext';

export default function AccountModal({ isOpen, onClose }) {
	const { user } = useAuth();
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [show, setShow] = useState(false);

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

	function displayNewCreds() {
		if (newPassword != '' && newPassword.length >= 5 && checkEmail() == true) {
			console.log('New Email Address - ' + newEmail);
			console.log('New Password - ' + newPassword);
		} else if (checkEmail() == true) {
			console.log('New Email Address - ' + newEmail);
		} else if (newPassword != '') {
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

	return (
		<>
			{user && (
				<Modal isOpen={isOpen} onClose={onClose}>
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
							<Button variantColor='blue' mr={3} onClick={onClose}>
								Close
							</Button>
							<Button variant='solid' variantColor='green' onClick={displayNewCreds}>
								Save Changes
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
}