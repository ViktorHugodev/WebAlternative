import { Grid } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { VideoItem } from '../components/Video/VideoItem';
import { DataProps, VideoProps } from '../context/types';
import { getVideosFromDb } from '../firebase/getVideosFromDb';
import { db } from '../firebase/initFirebase';

export default function Home({ data }: DataProps) {
	return (
		<Layout title="WebAlternative">
			<Grid
				templateColumns={{
					sm: '1fr 1fr',
					md: '1fr 1fr ',
					lg: 'repeat(3, 1fr)',
					xl: 'repeat(4, 1fr)',
				}}
				gap={6}
				p="6"
			>
				{data.map((video: VideoProps) => {
					return <VideoItem key={video.videoId} video={video} />;
				})}
			</Grid>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const data = await getVideosFromDb()
	return {
		props: {
			data: JSON.parse(JSON.stringify(data)),
		},
	};
};
