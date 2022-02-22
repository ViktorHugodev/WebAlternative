import { Grid } from '@chakra-ui/react';
import { orderByChild } from 'firebase/database';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
} from 'firebase/firestore/lite';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { VideoItem } from '../components/Video/VideoItem';
import { db, getVideos } from '../firebase/initFirebase';

import api from '../services/youtube';
import { useProps } from '../hooks/PropsContext';
interface VideoProps {
	publishedAt: string;
	description: string;
	liked: string[];
	unliked: string[];
	userId: string;
	likes: number;
	unLikes: number;
	videoId: string;
	title: string;
	addAt: string;
}
interface DataProps {
	data: VideoProps[];
}
export default function Home({ data }: DataProps) {
	const { user } = useProps();
	console.log(data);
	// const map = data.map((doc) => {
	// 	console.log(doc);
	// });
	return (
		<Layout title="WebAlternative">
			<Grid
				templateColumns={{
					sm: '1fr 1fr',
					md: '1fr 1fr ',
					lg: 'repeat(3, 1fr)',
					xl: 'repeat(4, 1fr)',
				}}
				gap={4}
				p="4"
			>
				{data.map((item: any, index: number) => {
					return <VideoItem key={item.id} item={{ item }} />;
				})}
			</Grid>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	// const response = await getVideos(db);

	// const docRef = doc(db, 'videos');
	const videosCol = collection(db, 'videos');

	//const queryConstraints = [orderByChild('liked')];

	const queryByOrderLiked = query(videosCol, orderBy('likes', 'desc'));
	const querySnap = await getDocs(queryByOrderLiked);
	const data = querySnap.docs.map((doc) => doc.data());
	// const response = await youtube.get('/videos', {
	//Aqui eu consigo pegar os parametros de um videp
	// 	params: { order: 'rating' },
	// });
	// const data = await response.data.items;

	// console.log('[getServerSideProps]: ', data);
	// console.log(data);
	// const returnData = data.forEach((i, index) => {
	// 	console.log(i[index].likes);
	// 	//i[index].likes = 0;
	// });
	// const temp = {
	// 	title:
	// }
	// console.log(returnData);

	return {
		props: {
			data: JSON.parse(JSON.stringify(data)),
		},
	};
};
