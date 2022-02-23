import { PropsProvider } from '../context/PropsContext';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<PropsProvider>
				<Component {...pageProps} />
			</PropsProvider>
		</ChakraProvider>
	);
}

export default MyApp;
