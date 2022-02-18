import { GridItem, Text, Flex, IconButton, Box } from '@chakra-ui/react';
import { VideoCard } from './VideoComponent';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useState } from 'react';
import { updateDoc, increment, doc, getDoc } from 'firebase/firestore/lite';
import app, { db } from '../../firebase/initFirebase';
import { useProps } from '../../hooks/PropsContext';
import { collection, getDocs } from 'firebase/firestore/lite';
export function VideoItem({ item, index }: any) {
	const { user } = useProps();
	const [isLike, setIsLike] = useState(false);
	const [historyLikes, setHistoryLikes] = useState([]);

	return (
		<GridItem w="360px" boxShadow="dark-lg" borderRadius="sm">
			<Box>
				<VideoCard item={item} />
			</Box>
			<Box minH="60px">
				<Text fontSize="sm" align="center">
					{item.item.title}
				</Text>
			</Box>
			<Box>
				<Flex align="center">
					<IconButton
						transition="all .3s"
						bg="none"
						_hover={{
							bg: 'none',
							filter: 'brightness(.8)',
							transform: 'scale(1.2)',
						}}
						aria-label="like"
						icon={<AiOutlineLike />}
					/>
					<Text fontSize="12px" color="gray.200">
						{item.item.likes}
					</Text>
					<IconButton
						transition="all .3s"
						_hover={{
							bg: 'none',
							filter: 'brightness(.8)',
							transform: 'scale(1.2)',
						}}
						bg="none"
						aria-label="deslike"
						icon={<AiOutlineDislike />}
					/>
					<Text fontSize="12px" color="gray.200">
						{item.item.unlikes}
					</Text>
				</Flex>
			</Box>
		</GridItem>
	);
}
