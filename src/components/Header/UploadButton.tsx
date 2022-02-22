import { Flex, Input, Icon, Button, IconButton } from '@chakra-ui/react';
import { BiVideoPlus } from 'react-icons/bi';
import { putVideos, db } from '../../firebase/initFirebase';

import { useState } from 'react';
import { useProps } from '../../hooks/PropsContext';
// interface UserProps {
// 	uid: string;
// 	email: string;
// 	name: string;
// 	token: string;
// 	provider: any;
// 	providerURL: string;
// }
// interface User {
// 	user: UserProps[];
// }
export function UploadButton() {
	const { user } = useProps();

	const [link, setLink] = useState('');
	return (
		<>
			<Flex>
				{/* <Input
					bg="gray.600"
					value={link}
					onChange={(e) => setLink(e.target.value)}
				/> */}

				<Flex align="center" ml="auto">
					<IconButton
						onClick={() => putVideos(db, link, user)}
						bg="none"
						aria-label="Add video"
						variant="link"
						color="gray.100"
						icon={<BiVideoPlus />}
					/>
				</Flex>
			</Flex>
		</>
	);
}
