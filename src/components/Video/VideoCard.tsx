import { Box, AspectRatio } from '@chakra-ui/react';
import {  VideosPropsArray } from '../../context/types';

export function VideoCard({ video }: VideosPropsArray) {
	return (
		<Box>
			<AspectRatio maxW="480px" ratio={16 / 9}>
				<iframe
					title={video.title}
					src={`https://www.youtube.com/embed/${video.videoId}`}
					allowFullScreen
				></iframe>
			</AspectRatio>
		</Box>
	);
}
