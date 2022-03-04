import { Box, Stack, Text } from '@chakra-ui/react';
import { VideosPropsArray } from '../../context/types';
import { ReactionsButtons } from '../Reactions/ReactionButtons';

export default function InfoViewCard({ video }: VideosPropsArray) {
	return (
		<Box boxShadow={'2xl'}>
			<Box
				maxW={'445px'}
				w={'full'}
				bg="black.dark"
				rounded={'md'}
				p={[2, 4, 6]}
			>
				<Stack direction={'column'} fontSize={'sm'}>
					<Box my="4">
						<Text fontWeight={600}>{video.title}</Text>
						<Text color={'text'}>{`${video.description.substring(
							0,
							200
						)}...`}</Text>
					</Box>
					<ReactionsButtons video={video} />
					<Text color="text">Adicionado por: {video.fullName}</Text>
					<Text color="text" mt="4">
						{new Date(video.addAt).toLocaleDateString('pt-BR', {
							day: '2-digit',
							month: 'short',
							year: 'numeric',
						})}
					</Text>
				</Stack>
			</Box>
		</Box>
	);
}
