import {
	GridItem,
	Text,
	Flex,
	IconButton,
	Box,
	Avatar,
} from '@chakra-ui/react';
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
	const [likeCount, setLikeCount] = useState(item.item.like);

	async function like(item: any) {
		if (user) {
			setIsLike(true);
			// let allLikes = [...historyLikes, item.item.id]
			let likeTemp = likeCount + 1;
			setLikeCount(likeTemp);

			await updateDoc(doc(db, 'videos', item.id), {
				likes: increment(1),
			});
		}
	}

	return (
		<GridItem w="360px" boxShadow="2xl" borderRadius="sm">
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
						onClick={like}
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
					<Text fontSize="14px">Add por:{item.item?.displayName}</Text>
					<Avatar
						src={item.item?.userPhoto}
						name={item.item?.displayName}
						size="sm"
						mr="4"
					/>
				</Flex>
			</Box>
		</GridItem>
	);
}
