/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Flex, GridItem, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useProps } from '../../context/PropsContext';
import { ReactionsButtons } from '../Reactions/ReactionButtons';
import { VideoCard } from './VideoComponent';

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
export function VideoItem({ item }: VideoProps) {
	const { user } = useProps();

	return (
		<GridItem maxW="360px" boxShadow="2xl" borderRadius="sm">
			<Link href={`/${item.item.videoId}`} passHref>
				<a>
					<Box>
						<VideoCard item={item} />
					</Box>
					<Flex minH="60px" justify="center" align="center">
						<Text fontSize="md" align="center" fontWeight="bold">
							{item.item.title}
						</Text>
					</Flex>
				</a>
			</Link>
			<Link href={`/${item.item.videoId}`}>
				<a></a>
			</Link>
			<Flex align="center" justify="space-between" flex="1">
				<ReactionsButtons reactions={item.item} />
				<Flex align="center">
					<Text fontSize="14px">{item.item?.displayName}</Text>
					<Avatar
						src={item.item?.userPhoto}
						name={item.item?.displayName}
						size="sm"
						mx="4"
					/>
				</Flex>
			</Flex>
		</GridItem>
	);
}
