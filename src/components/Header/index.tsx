import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useProps } from '../../context/PropsContext';
import GoogleButton from './GoogleLoginButton';
import { Logo } from './Logo';
import { Profile } from './Profile';
import { UploadButton } from './UploadButton';
import { UploadInput } from './UploadInput';

export function Header() {
	const { user, signIn, signOutAuth } = useProps();
	const [showChild, setShowChild] = useState(false);
	useEffect(() => {
		setShowChild(true);
	}, [])
	
	if(!showChild) {
		return null
	}
	
	return (
		<Flex
			w="100%"
			maxWidth={1660}
			bg="dark.black"
			h="14"
			mx="auto"
			boxShadow="xl"
			px="6"
			align="center"
			justifyContent={{ sm: 'space-between', base: 'center' }}
		>
			<Logo />

			<UploadInput />

			{!user ? (
				<GoogleButton signIn={signIn} />
			) : (
				<Profile user={user} signOutAuth={signOutAuth} />
			)}
		</Flex>
	);
}
