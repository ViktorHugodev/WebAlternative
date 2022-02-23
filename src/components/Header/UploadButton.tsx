import { Flex, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { BiVideoPlus } from 'react-icons/bi';
import { useProps } from '../../context/PropsContext';
import { db, putVideos } from '../../firebase/initFirebase';

export function UploadButton() {
	const { user } = useProps();

	const [link, setLink] = useState('');
	return (
		<>
			<Flex>
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
