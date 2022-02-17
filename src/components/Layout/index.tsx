import { ReactElement } from 'react';
import {Flex,Container, Box, Wrap, Grid, GridItem} from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../Header/index';

import { Sidebar } from '../SideBar';

interface LayoutProps {
	children?: ReactElement;
  title: string
}

export default function Layout({  children,title }: LayoutProps) {
	return (
    <Container w="100vw" overflow="hidden" maxWidth="1460px" p="0">

      <Head>
        <title>{title}</title>
      </Head>
			<Header/>
      {children}
    </Container>
	
	)
}
