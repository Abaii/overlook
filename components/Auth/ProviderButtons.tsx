import { Box, Button, Stack, useToast } from '@chakra-ui/core';
import firebase from 'firebase';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook2 } from 'react-icons/im';
import initFirebase from '../../utils/auth/initFirebase';
import router from 'next/router';

initFirebase();

const ProviderButtons = () => {
	const toast = useToast();

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
	return (
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
	);
};

export default ProviderButtons;
