import { Flex } from '@chakra-ui/react';
import { useProps } from '../../hooks/PropsContext';
import GoogleButton from './GoogleLoginButton';
import { Logo } from './Logo';
import { Profile } from './Profile';
import { UploadInput } from './UploadInput';

export function Header() {
	const { user, signIn, signOutAuth } = useProps();

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
			justifyContent="space-between"
		>
			<Logo />

			<UploadInput user={user} />
			{!user ? (
				<GoogleButton signIn={signIn} />
			) : (
				<Profile user={user} signOutAuth={signOutAuth} />
			)}
		</Flex>
	);
}
