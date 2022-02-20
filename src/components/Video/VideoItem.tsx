import { getDatabase, query, ref, update } from 'firebase/database';
import Link from 'next/link';
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
	const [loading, setLoading] = useState(false);
	const [isUnlike, setIsUnLike] = useState(false);
	const [historyLikes, setHistoryLikes] = useState<any>([]);
	const [likeCount, setLikeCount] = useState(item.item.liked.length);
	const [unlikeCount, setUnlikeCount] = useState(item.item.unliked.length);

	// async function checkLiked() {
	// 	if (user) {
	//     const docRef = doc(db, 'videos', item.item.videoId);
	// 		const docGet = await getDoc(docRef);
	// 	}
	// }

	async function like() {
		if (user) {
			setLoading(true);
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
						setIsLike(false);
						setLikeCount(likeCount - 1);
					} else {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							liked: arrayUnion(user.uid),
						});
						setLikeCount(likeCount + 1);
						setIsLike(true);
						console.log('Adicionou like');
						if (refUnliked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', item.item.videoId), {
								unliked: arrayRemove(user.uid),
							});
							console.log('Removeu unlike');
							setUnlikeCount(unlikeCount - 1);
							setIsUnLike(false);
						}
					}
				}
				setLoading(false);
				return;
			}
		}
	}
	async function unlike() {
		if (user) {
			setLoading(true);
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
				setLoading(false);
				return;
			}
		}
	}

	return (
		<GridItem w="360px" boxShadow="2xl" borderRadius="sm">
			<Link href={`/${item.item.videoId}`}>
				<a href="">
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
			<Flex>
				<Flex align="center">
					<IconButton
						zIndex="2"
						onClick={like}
						isLoading={loading}
						transition="all .3s"
						isDisabled={user ? false : true}
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
						isDisabled={user ? false : true}
						transition="all .3s"
						isLoading={loading}
						_hover={{
							bg: 'none',
							filter: 'brightness(.8)',
							transform: 'scale(1.2)',
						}}
						bg="none"
						variant="ghost"
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
