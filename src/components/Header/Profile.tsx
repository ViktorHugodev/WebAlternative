import { Flex, Avatar, Text } from '@chakra-ui/react';

interface ProfileProps {
	photoURL: string;
	displayName: string;
}
interface User {
	user: ProfileProps;
}
export function Profile({ user }: User) {
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
		</Flex>
	);
}
