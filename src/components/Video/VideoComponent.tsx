import { Box, AspectRatio } from '@chakra-ui/react';
interface VideoProps {
	item: {
		item: {
			addAt: string;
			description: string;
			displayName: string;
			publishedAt: string;
			title: string;
			userId: string;
			userPhoto: string;
			videoId: string;
			likes: number;
			unlikes: number;
		};
	};
}
export function VideoCard({ item }: VideoProps) {
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
