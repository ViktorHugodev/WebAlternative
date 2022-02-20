import { getDatabase, query, ref, update } from 'firebase/database';
import {
	GridItem,
	Text,
	Flex,
	IconButton,
	Box,
	Avatar,
	Spinner,
} from '@chakra-ui/react';
import { VideoCard } from './VideoComponent';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useState } from 'react';
import {
	updateDoc,
	increment,
	doc,
	getDoc,
	setDoc,
	addDoc,
	deleteDoc,
	arrayUnion,
	collection,
	getDocs,
	collectionGroup,
	where,
	deleteField,
	arrayRemove,
	FieldValue,
} from 'firebase/firestore/lite';
import app, { db } from '../../firebase/initFirebase';
import { useProps } from '../../hooks/PropsContext';
// import { collection, getDocs } from 'firebase/firestore/lite';

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
			liked: string[];
			unlikes: number;
			unliked: string[];
		};
	};
}
export function VideoItem({ item }: VideoProps) {
	const { user } = useProps();
	const [isLike, setIsLike] = useState(false);
	const [historyLikes, setHistoryLikes] = useState<any>([]);
	const [likeCount, setLikeCount] = useState(item.item.liked.length);
	const [unlikeCount, setUnlikeCount] = useState(item.item.unliked.length);
	let likeTemp = likeCount;
	let unlikeTemp = unlikeCount;
	async function like() {
		if (user) {
			setIsLike(true);
			const docRef = doc(db, 'videos', item.item.videoId);

			const docGet = await getDoc(docRef);
			if (docGet.exists()) {
				const refLiked = docGet.data().liked;
				const refUnliked = docGet.data().unliked;

				if (refLiked) {
					if (refLiked.includes(user.uid)) {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							liked: arrayRemove(user.uid),
						});
						console.log('Removeu like');
						setLikeCount(likeCount - 1);
					} else {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							liked: arrayUnion(user.uid),
						});
						setLikeCount(likeCount + 1);
						console.log('Adicionou like');
						if (refUnliked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', item.item.videoId), {
								unliked: arrayRemove(user.uid),
							});
							console.log('Removeu unlike');
							setUnlikeCount(unlikeCount - 1);
						}
					}
				}

				console.log('like temp', likeTemp);
				console.log('unlike temp', unlikeTemp);

				return;
			}
		}
	}
	async function unlike() {
		if (user) {
			setIsLike(false);
			const docRef = doc(db, 'videos', item.item.videoId);
			const docGet = await getDoc(docRef);

			if (docGet.exists()) {
				const refUnliked = docGet.data().unliked;
				const refLiked = docGet.data().liked;
				if (refLiked) {
					if (refUnliked.includes(user.uid)) {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							unliked: arrayRemove(user.uid),
						});
						setUnlikeCount(unlikeCount - 1);
						console.log('Removeu unlike');
					} else {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							unliked: arrayUnion(user.uid),
						});
						setUnlikeCount(unlikeCount + 1);
						console.log('Adicionou unlike');
						if (refLiked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', item.item.videoId), {
								liked: arrayRemove(user.uid),
							});
							setLikeCount(likeCount - 1);
							console.log('removeu like');
						}
					}
				}
				return;
			}
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
			<Flex>
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
						{/* {likeCount === item.item.likes ? item.item.likes : likeCount} */}
						{likeCount}
					</Text>
					<IconButton
						onClick={unlike}
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
						{unlikeCount}
					</Text>
				</Flex>
				<Flex align="center" justify="flex-end" flex="1">
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
