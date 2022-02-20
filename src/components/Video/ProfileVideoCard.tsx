import {
	Box,
	Center,
	Heading,
	Text,
	Stack,
	Avatar,
	useColorModeValue,
} from '@chakra-ui/react';

interface VideoProps {
	addAt: string;
	description: string;
	displayName: string;
	publishedAt: string;
	fullName: string;
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
export default function ProfileVideoCard({ data }: DataProps) {
	return (
		<Box overflow="hidden">
			<Box
				// maxW={'445px'}
				w={'full'}
				bg="black.dark"
				boxShadow={'2xl'}
				rounded={'md'}
				p={6}
			>
				<Stack mt={6} direction={'row'} spacing={4} align={'center'}>
					<Avatar src={data.userPhoto} />
					<Stack direction={'column'} spacing={0} fontSize={'sm'}>
						<Text fontWeight={600}>{data.displayName}</Text>
						<Text color={'gray.500'}>{data.fullName}</Text>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}
