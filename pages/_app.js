import '../styles/globals.css';
import { ThemeProvider } from '@chakra-ui/core';
import normalize from 'normalize.css';
import { Global, css } from '@emotion/core';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function MyApp({ Component, pageProps }) {
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
				<Navbar></Navbar>
				<Component {...pageProps} />
				<Footer></Footer>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
