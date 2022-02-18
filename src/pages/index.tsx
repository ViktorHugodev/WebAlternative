import { Grid } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { VideoItem } from '../components/Video/VideoItem';
import { db, getVideos } from '../firebase/initFirebase';

export default function Home(data: any) {
	return (
		<Layout title="WebAlternative">
			<Grid
				templateColumns={{
					sm: '1fr 1fr',
					md: '1fr 1fr 1fr',
					lg: 'repeat(4, 1fr)',
				}}
				gap={4}
				p="4"
			>
				{data.data.map((item: any, index: number) => {
					return <VideoItem key={item.id} item={{ item }} />;
				})}
			</Grid>
		</Layout>
	);
}

//300x168

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await getVideos(db);
	const data = response;
	// const response = await youtube.get('/videos', {
	//Aqui eu consigo pegar os parametros de um videp
	// 	params: { order: 'rating' },
	// });
	// const data = await response.data.items;

	// console.log('[getServerSideProps]: ', data);

	return {
		props: {
			data: JSON.parse(JSON.stringify(data)),
		},
	};
};

// const original = post.snippet.description;
// const limit = 100;

// const description = (original.length > limit) ? `${original.substring(0, original.indexOf(' ', limit))}...` : original;

// {`${item.views} • ${dayjs(item.snippet.publisehdAt).fromNow()}`}
