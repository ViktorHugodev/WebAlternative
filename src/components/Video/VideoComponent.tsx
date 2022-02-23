import { Box, AspectRatio } from '@chakra-ui/react';
interface VideoProps {
	item: {
		item: {
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
