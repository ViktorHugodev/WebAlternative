import Link from 'next/link';
import {
	GridItem,
	Text,
	Flex,
	IconButton,
	Box,
	Avatar,
	Spinner,
	Button,
} from '@chakra-ui/react';
import { VideoCard } from './VideoComponent';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useEffect, useState } from 'react';
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
	orderBy,
	query,
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
export function VideoItem({ item }: any) {
	const { user } = useProps();

	const [loading, setLoading] = useState(false);
	const [isUnlike, setIsUnLike] = useState(false);
	const [historyLikes, setHistoryLikes] = useState<any>([]);
	const [likeCount, setLikeCount] = useState(item.item.likes);
	const [unlikeCount, setUnlikeCount] = useState(item.item.unlikes);
	const [likedUser, setUserLiked] = useState([item.item.liked]);
	const [isLiked, setLiked] = useState(false);
	const [isUnliked, setUnliked] = useState(false);
	useEffect(() => {
		isLikedCheck();
		isUnlikedCheck();
	}, [user]);

	async function isLikedCheck() {
		if (user) {
			const docRef = doc(db, 'videos', item.item.videoId);
			const docGet = await getDoc(docRef);
			if (docGet.exists())
				if (docGet.data().liked.includes(user.uid)) return setLiked(true);
		}
	}
	async function isUnlikedCheck() {
		if (user) {
			const docRef = doc(db, 'videos', item.item.videoId);
			const docGet = await getDoc(docRef);
			if (docGet.exists())
				if (docGet.data().unliked.includes(user.uid)) return setUnliked(true);
		}
	}

	async function like() {
		if (user) {
			setLoading(true);
			const docRef = doc(db, 'videos', item.item.videoId);

			const docGet = await getDoc(docRef);
			if (docGet.exists()) {
				const refLiked = docGet.data().liked;
				const refUnliked = docGet.data().unliked;
				if (refLiked)
					if (refLiked) {
						if (refLiked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', item.item.videoId), {
								liked: arrayRemove(user.uid),
								likes: increment(-1),
							});
							console.log('Removeu like');
							setLiked(false);
							setLikeCount(likeCount - 1);
						} else {
							await updateDoc(doc(db, 'videos', item.item.videoId), {
								liked: arrayUnion(user.uid),
								likes: increment(1),
							});
							setLikeCount(likeCount + 1);
							setLiked(true);
							console.log('Adicionou like');
							if (refUnliked.includes(user.uid)) {
								await updateDoc(doc(db, 'videos', item.item.videoId), {
									unliked: arrayRemove(user.uid),
									unlikes: increment(-1),
								});
								console.log('Removeu unlike');
								setUnlikeCount(unlikeCount - 1);
								setUnliked(false);
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
			// setLiked(false);
			const docRef = doc(db, 'videos', item.item.videoId);
			const docGet = await getDoc(docRef);

			if (docGet.exists()) {
				const refUnliked = docGet.data().unliked;
				const refLiked = docGet.data().liked;
				if (refLiked) {
					if (refUnliked.includes(user.uid)) {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							unliked: arrayRemove(user.uid),
							unlikes: increment(-1),
						});
						setUnliked(false);
						setUnlikeCount(unlikeCount - 1);
						console.log('Removeu unlike');
					} else {
						await updateDoc(doc(db, 'videos', item.item.videoId), {
							unliked: arrayUnion(user.uid),
							unlikes: increment(1),
						});
						setUnliked(true);
						setUnlikeCount(unlikeCount + 1);
						console.log('Adicionou unlike');
						if (refLiked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', item.item.videoId), {
								liked: arrayRemove(user.uid),
								likes: increment(-1),
							});
							setLikeCount(likeCount - 1);
							setLiked(false);
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
			<Flex>
				<Flex align="center">
					<Button
						mr="2"
						zIndex="2"
						onClick={() => {
							like();
							// checkLiked();
							isUnlikedCheck();
						}}
						isActive={isLiked}
						isLoading={loading}
						transition="all .3s"
						isDisabled={user ? false : true}
						color="gray.400"
						bg="none"
						height="32px"
						width="32px"
						_active={{
							transform: 'scale(1.1)',
							color: 'gray.50',
							border: '1px',
						}}
						_hover={{
							bg: 'none',
							filter: 'brightness(.8)',
							transform: 'scale(1.2)',
						}}
						aria-label="like"
						leftIcon={<AiOutlineLike />}
					>
						<Text fontSize="12px" color="gray.200">
							{likeCount}
						</Text>
					</Button>
					<Button
						zIndex="2"
						onClick={() => {
							unlike();
							// checkLiked();
							isLikedCheck();
						}}
						isActive={isUnliked}
						isLoading={loading}
						transition="all .3s"
						isDisabled={user ? false : true}
						color="gray.400"
						bg="none"
						height="32px"
						width="32px"
						_active={{
							transform: 'scale(1.1)',
							color: 'gray.50',
							border: '1px',
						}}
						_hover={{
							bg: 'none',
							filter: 'brightness(.8)',
							transform: 'scale(1.2)',
						}}
						aria-label="like"
						leftIcon={<AiOutlineDislike />}
					>
						<Text fontSize="12px" color="gray.200">
							{unlikeCount}
						</Text>
					</Button>
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
