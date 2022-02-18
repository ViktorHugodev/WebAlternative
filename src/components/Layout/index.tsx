import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Header } from '../Header/index';

interface LayoutProps {
	children?: ReactElement;
	title: string;
}

export default function Layout({ children, title }: LayoutProps) {
	return (
		<Container w="100vw" overflow="hidden" maxWidth="1560px" p="0">
			<Head>
				<title>{title}</title>
			</Head>
			<Header />
			{children}
		</Container>
	);
}
