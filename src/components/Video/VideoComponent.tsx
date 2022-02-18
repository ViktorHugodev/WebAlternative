import { Box, AspectRatio } from '@chakra-ui/react';

export function VideoCard({ item }: any) {
	// console.log(item);
	return (
		<Box>
			<AspectRatio maxW="480px" ratio={16 / 9}>
				<iframe
					title={item.item.title}
					src={`https://www.youtube.com/embed/${item.item.videoId}`}
					allowFullScreen
				></iframe>
			</AspectRatio>
		</Box>
	);
}

// display={{'-webkit-box', '-webkit-line-clamp': 2, '-web-kit-box-orient': 'vertical', overflow: 'hidden'}}
