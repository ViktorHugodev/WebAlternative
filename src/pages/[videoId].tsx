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

export default function VideoPage({ data }: DataProps) {
	return (
		<Layout title={data.title}>
			<Box p={{ sm: '2', lg: '6' }} overflow="hidden">
				<AspectRatio maxW="full" ratio={16 / 9} boxShadow="dark-lg" flex="1">
					<iframe
						title={data.title}
						src={`https://www.youtube.com/embed/${data.videoId}`}
						allowFullScreen
					></iframe>
				</AspectRatio>
				<Flex
					px="2"
					justify="space-between"
					direction={['column-reverse', 'column-reverse', 'row']}
				>
					<InfoViewCard data={data} />
					<ProfileVideoCard data={data} />
				</Flex>
			</Box>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { videoId } = context.params;
	const docRef = doc(db, 'videos', videoId);
	const docGet = await getDoc(docRef);

	return {
		props: {
			data: JSON.parse(JSON.stringify(docGet.data())),
		},
	};
};
