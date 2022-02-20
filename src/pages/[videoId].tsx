/* eslint-disable react/jsx-no-undef */
import { AspectRatio, Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import InfoViewCard from '../components/Video/InfoVideoCard';
import ProfileVideoCard from '../components/Video/ProfileVideoCard';
import { db } from '../firebase/initFirebase';

interface VideoProps {
	addAt: string;
	description: string;
	displayName: string;
	publishedAt: string;
	title: string;
	fullName: string;
	userId: string;
	userPhoto: string;
	videoId: string;
	liked: string[];
	unliked: string[];
}
interface DataProps {
	data: VideoProps;
}

export default function VideoPage({ data }: DataProps) {
	console.log(data);
	return (
		<Layout title={data.title}>
			<Box p="6" overflow="hidden">
				<AspectRatio
					maxW="full"
					// maxH="100vh"
					flex="1"
					ratio={16 / 9}
					boxShadow="dark-lg"
				>
					<iframe
						title={data.title}
						src={`https://www.youtube.com/embed/${data.videoId}`}
						allowFullScreen
					></iframe>
				</AspectRatio>
				<Flex px="8" justify="space-between" overflow="hidden">
					<InfoViewCard data={data} />
					<ProfileVideoCard data={data} />
				</Flex>
			</Box>
		</Layout>
	);
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
	//Motivo do SSRendering aqui: Pois precisa de verificação de usário. Logo precisa chamar a API, não pode ser estática
	const { videoId } = context.params;
	const docRef = doc(db, 'videos', videoId);
	const docGet = await getDoc(docRef);

	return {
		props: {
			data: JSON.parse(JSON.stringify(docGet.data())),
		},
	};
};
