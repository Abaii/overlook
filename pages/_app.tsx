import '../styles/globals.css';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Page } from '../styles/global_emotion.styles';
import firebase from 'firebase';
import react, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../utils/auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Global
				styles={css`
					button {
						border: none;
					}
					input {
						border: none;
					}
				`}
			/>
			<ThemeProvider>
				<CSSReset />
				<AuthProvider>
					<Page>
						<Navbar />
						<Component {...pageProps} />
						
					</Page>
				</AuthProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
