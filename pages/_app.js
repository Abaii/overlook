import '../styles/globals.css';
import { ThemeProvider } from '@chakra-ui/core';
import normalize from 'normalize.css';
import { Global, css } from '@emotion/core';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Page } from '../styles/global_emotion.styles';
import firebase from 'firebase';
import react, { useState, useEffect } from 'react';
import initFirebase from '../utils/auth/initFirebase';

initFirebase();

function MyApp({ Component, pageProps }) {
	const [isLogged, setIsLogged] = useState(false);
	const [userH, setUser] = useState();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in.
			setIsLogged(true);
			setUser(user);
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			// ...
		} else {
			// User is signed out.
			// ...
			setIsLogged(false);
			setUser(null);
		}
	});

	return (
		<>
			<Global
				styles={css`
					${normalize}
					button {
						border: none;
					}
					input {
						border: none;
					}
				`}
			/>
			<ThemeProvider>
				<Page>
					<Navbar isLogged={isLogged} user={userH} />
					<Component {...pageProps} />
					<Footer />
				</Page>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
