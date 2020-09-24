import "../styles/globals.css";
import { ThemeProvider } from "@chakra-ui/core";
import normalize from "normalize.css";
import { Global, css } from "@emotion/core";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Page } from "../styles/global_emotion.styles";

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
				<Page>
					<Navbar />
					<Component {...pageProps} />
				</Page>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
