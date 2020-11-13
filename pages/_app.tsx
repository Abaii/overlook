import '../styles/globals.css';
import { CSSReset, ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Page } from '../styles/global_emotion.styles';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../utils/auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<ChakraProvider>
				<AuthProvider>
					<Page>
						<Navbar />
						<Component {...pageProps} />

						<Footer />
					</Page>
				</AuthProvider>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
