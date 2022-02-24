import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { ReactionsButtons } from '../Reactions/ReactionButtons';

interface VideoProps {
	addAt: string;
	description: string;
	displayName: string;
	fullName: string;
	publishedAt: string;
	title: string;
	userId: string;
	userPhoto: string;
	likes: number;
	unlikes: number;
	videoId: string;
	liked: string[];
	unliked: string[];
}
interface DataProps {
	data: VideoProps;
}
export default function InfoViewCard({ data }: DataProps) {
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
						<Text fontWeight={600}>{data.title}</Text>
						<Text color={'text'}>{`${data.description.substring(
							0,
							200
						)}...`}</Text>
					</Box>
					<ReactionsButtons reactions={data} />
					<Text color="text">Adicionado por: {data.fullName}</Text>
					<Text color="text" mt="4">
						{new Date(data.addAt).toLocaleDateString('pt-BR', {
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
