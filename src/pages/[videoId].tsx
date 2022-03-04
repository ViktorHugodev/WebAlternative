/* eslint-disable react/jsx-no-undef */
import { AspectRatio, Box, Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import InfoViewCard from '../components/Video/InfoVideoCard';
import ProfileVideoCard from '../components/Video/ProfileVideoCard';
import { VideosPropsArray } from '../context/types';
import { db } from '../firebase/initFirebase';

export default function VideoPage({ video }: VideosPropsArray) {
	return (
		<Layout title={video.title}>
			<Box p={{ sm: '2', lg: '6' }} overflow="hidden">
				<AspectRatio maxW="full" ratio={16 / 9} boxShadow="dark-lg" flex="1">
					<iframe
						title={video.title}
						src={`https://www.youtube.com/embed/${video.videoId}`}
						allowFullScreen
					></iframe>
				</AspectRatio>
				<Flex
					px="2"
					justify="space-between"
					direction={['column-reverse', 'column-reverse', 'row']}
				>
					<InfoViewCard video={video} />
					<ProfileVideoCard video={video} />
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
			video: JSON.parse(JSON.stringify(docGet.data())),
		},
	};
};
