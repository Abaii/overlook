import '../styles/globals.css';
import { ThemeProvider } from '@chakra-ui/core';
import normalize from 'normalize.css';
import { Global, css } from '@emotion/core';

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
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
