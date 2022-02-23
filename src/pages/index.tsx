import { Grid } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { VideoItem } from '../components/Video/VideoItem';
import { useProps } from '../context/PropsContext';
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
	data: VideoProps[];
}
export default function Home({ data }: DataProps) {
	const { user } = useProps();

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
				{data.map((item: VideoProps) => {
					return <VideoItem key={item.videoId} item={{ item }} />;
				})}
			</Grid>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const videosCol = collection(db, 'videos');
	const queryByOrderLiked = query(videosCol, orderBy('likes', 'desc'));
	const querySnap = await getDocs(queryByOrderLiked);
	const data = querySnap.docs.map((doc) => doc.data());

	return {
		props: {
			data: JSON.parse(JSON.stringify(data)),
		},
	};
};
