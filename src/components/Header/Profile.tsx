import { Flex, Avatar, Text, Button, useProps } from '@chakra-ui/react';

interface ProfileProps {
	photoURL: string;
	displayName: string;
	email: string;
}
interface User {
	signOutAuth: () => void;
	user: ProfileProps;
}
export function Profile({ user, signOutAuth }: User) {
	// const {signOutAuth} = useProps()
	function formatName(name: string) {
		const nameBefore = `${user?.displayName.split(' ')[0]} ${
			user?.displayName.split(' ')[1]
		}`;

		return nameBefore;
	}
	return (
		<Flex px="4" align="center">
			<Avatar src={user?.photoURL} name={user?.displayName} size="sm" mr="4" />
			<Text>{formatName(user?.displayName)}</Text>
			<Button variant="ghost" onClick={signOutAuth} _hover={{ bg: 'none' }}>
				<Text fontWeight="light" fontSize="14px">
					Sair
				</Text>
			</Button>
		</Flex>
	);
}
