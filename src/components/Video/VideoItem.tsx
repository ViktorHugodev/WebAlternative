/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Flex, GridItem, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { VideosPropsArray } from '../../context/types';
import { ReactionsButtons } from '../Reactions/ReactionButtons';
import { VideoCard } from './VideoCard';

export function VideoItem({ video }: VideosPropsArray) {
	return (
		<GridItem maxW="360px" boxShadow="2xl" borderRadius="sm">
			<Link href={`/${video.videoId}`} passHref>
				<a>
					<Box>
						<VideoCard video={video} />
					</Box>
					<Flex minH="60px" justify="center" align="center">
						<Text fontSize="md" align="center" fontWeight="bold">
							{video.title}
						</Text>
					</Flex>
				</a>
			</Link>
			<Link href={`/${video.videoId}`}>
				<a></a>
			</Link>
			<Flex align="center" justify="space-between" flex="1">
				<ReactionsButtons video={video} />
				<Flex align="center">
					<Text fontSize="14px">{video.displayName}</Text>
					<Avatar
						src={video?.userPhoto}
						name={video?.displayName}
						size="sm"
						mx="4"
					/>
				</Flex>
			</Flex>
		</GridItem>
	);
}
