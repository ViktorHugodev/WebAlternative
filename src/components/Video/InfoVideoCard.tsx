import {
	Box,
	Center,
	Heading,
	Text,
	Stack,
	Avatar,
	useColorModeValue,
	IconButton,
	Flex,
} from '@chakra-ui/react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

interface VideoProps {
	addAt: string;
	description: string;
	displayName: string;
	fullName: string;
	publishedAt: string;
	title: string;
	userId: string;
	userPhoto: string;
	videoId: string;
	liked: string[];
	unliked: string[];
}
interface DataProps {
	data: VideoProps;
}
export default function InfoViewCard({ data }: DataProps) {
	return (
		<Box>
			<Box
				maxW={'445px'}
				w={'full'}
				bg="black.dark"
				boxShadow={'2xl'}
				rounded={'md'}
				p={6}
				// overflow={'hidden'}
			>
				<Stack mt={2} direction={'row'} spacing={4} align={'center'}>
					<Stack direction={'column'} spacing={0} fontSize={'sm'}>
						<Box my="4">
							<Text fontWeight={600}>{data.title}</Text>
							<Text color={'text'}>{`${data.description.substring(
								0,
								200
							)}...`}</Text>
						</Box>
						<Flex align="center">
							<IconButton
								// onClick={like}
								transition="all .3s"
								bg="none"
								_hover={{
									bg: 'none',
									filter: 'brightness(.8)',
									transform: 'scale(1.2)',
								}}
								aria-label="like"
								icon={<AiOutlineLike />}
							/>
							<Text fontSize="12px" color="gray.200">
								{/* {likeCount === item.item.likes ? item.item.likes : likeCount} */}
								{data.liked.length}
							</Text>
							<IconButton
								// onClick={unlike}
								transition="all .3s"
								_hover={{
									bg: 'none',
									filter: 'brightness(.8)',
									transform: 'scale(1.2)',
								}}
								bg="none"
								aria-label="deslike"
								icon={<AiOutlineDislike />}
							/>
							<Text fontSize="12px" color="gray.200">
								{data.unliked.length}
							</Text>
						</Flex>
						<Text color="text">Adicionado por: {data.fullName}</Text>
						<Text color="text" mt="4">
							{new Date(data.addAt).toLocaleDateString('pt-BR', {
								day: '2-digit',
								month: 'short',
								year: 'numeric',
							})}
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}
