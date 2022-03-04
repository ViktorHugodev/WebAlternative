import { Avatar, Box, Stack, Text } from '@chakra-ui/react';
import { DataProps, VideosPropsArray } from '../../context/types';

export default function ProfileVideoCard({ video }: VideosPropsArray) {
	return (
		<Box overflow="hidden">
			<Box
				w={'full'}
				bg="black.dark"
				boxShadow={'2xl'}
				rounded={'md'}
				p={[2, 4, 6]}
			>
				<Stack mt={6} direction={'row'} spacing={4} align={'center'}>
					<Avatar src={video.userPhoto} />
					<Stack direction={'column'} spacing={0} fontSize={'sm'}>
						<Text fontWeight={600}>{video.displayName}</Text>
						<Text color={'gray.500'}>{video.fullName}</Text>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}
