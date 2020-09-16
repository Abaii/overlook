import '../styles/globals.css'
import { ThemeProvider } from "@chakra-ui/core";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div
        style={{padding: '0 30px'}}
      >
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp
