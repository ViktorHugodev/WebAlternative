import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { VideoCard } from '../components/Layout/VideoComponent';
import youtube from '../services/youtube';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';

import app from '../firebase/initFirebase';
import { getVideos, db, putVideos } from '../firebase/initFirebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



export default function Home(data: any) {

	// console.log('data: ', data);
  
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
				{data.data.map((item: any) => {
					return (
						<GridItem key={item.id} w="480px">
							<VideoCard item={item} />
							<Text>{item.title}</Text>
              <Text>{`Likes: ${item.likes} Unlikes:${item.unlikes}`}</Text>
							{/* <Text>{item.statistics.viewCount}
								{new Date(item.snippet.publishedAt).toLocaleDateString(
									'pt-BR',
									{ day: '2-digit', month: 'short', year: 'numeric' }
								)}
							</Text> */}
							{/* <Text></Text> */}
						</GridItem>
					);
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

	console.log('[getServerSideProps]: ', data);

	return {
		props: {
			data,
		},
	};
};

// const original = post.snippet.description;
// const limit = 100;

// const description = (original.length > limit) ? `${original.substring(0, original.indexOf(' ', limit))}...` : original;

// {`${item.views} • ${dayjs(item.snippet.publisehdAt).fromNow()}`}
