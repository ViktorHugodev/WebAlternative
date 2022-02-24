/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text, Button } from '@chakra-ui/react';
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	increment,
	updateDoc,
} from 'firebase/firestore/lite';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { db } from '../../firebase/initFirebase';
import { useProps } from '../../context/PropsContext';
import { useEffect, useState } from 'react';

interface VideosProps {
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
}
interface ReactionProps {
	reactions: VideosProps;
}
export function ReactionsButtons({ reactions }: ReactionProps) {
	const [loading, setLoading] = useState(false);
	const [likeCount, setLikeCount] = useState(reactions.likes);
	const [unlikeCount, setUnlikeCount] = useState(reactions.unlikes);
	const [isLiked, setLiked] = useState(false);
	const [isUnliked, setUnliked] = useState(false);
	const { user } = useProps();

	useEffect(() => {
		isLikedCheck();
		isUnlikedCheck();
	}, [user]);

	async function isLikedCheck() {
		if (user) {
			const docRef = doc(db, 'videos', reactions.videoId);
			const docGet = await getDoc(docRef);
			if (docGet.exists())
				if (docGet.data().liked.includes(user.uid)) return setLiked(true);
		}
	}
	async function isUnlikedCheck() {
		if (user) {
			const docRef = doc(db, 'videos', reactions.videoId);
			const docGet = await getDoc(docRef);
			if (docGet.exists())
				if (docGet.data().unliked.includes(user.uid)) return setUnliked(true);
		}
	}

	async function like() {
		if (user) {
			setLoading(true);
			const docRef = doc(db, 'videos', reactions.videoId);
			const docGet = await getDoc(docRef);
			if (docGet.exists()) {
				const refLiked = docGet.data().liked;
				const refUnliked = docGet.data().unliked;
				if (refLiked)
					if (refLiked) {
						if (refLiked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', reactions.videoId), {
								liked: arrayRemove(user.uid),
								likes: increment(-1),
							});
							setLiked(false);
							setLikeCount(likeCount - 1);
						} else {
							await updateDoc(doc(db, 'videos', reactions.videoId), {
								liked: arrayUnion(user.uid),
								likes: increment(1),
							});
							setLikeCount(likeCount + 1);
							setLiked(true);
							if (refUnliked.includes(user.uid)) {
								await updateDoc(doc(db, 'videos', reactions.videoId), {
									unliked: arrayRemove(user.uid),
									unlikes: increment(-1),
								});
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

			const docRef = doc(db, 'videos', reactions.videoId);
			const docGet = await getDoc(docRef);

			if (docGet.exists()) {
				const refUnliked = docGet.data().unliked;
				const refLiked = docGet.data().liked;
				if (refLiked) {
					if (refUnliked.includes(user.uid)) {
						await updateDoc(doc(db, 'videos', reactions.videoId), {
							unliked: arrayRemove(user.uid),
							unlikes: increment(-1),
						});
						setUnliked(false);
						setUnlikeCount(unlikeCount - 1);
					} else {
						await updateDoc(doc(db, 'videos', reactions.videoId), {
							unliked: arrayUnion(user.uid),
							unlikes: increment(1),
						});
						setUnliked(true);
						setUnlikeCount(unlikeCount + 1);
						if (refLiked.includes(user.uid)) {
							await updateDoc(doc(db, 'videos', reactions.videoId), {
								liked: arrayRemove(user.uid),
								likes: increment(-1),
							});
							setLikeCount(likeCount - 1);
							setLiked(false);
						}
					}
				}
				setLoading(false);
				return;
			}
		}
	}
	return (
		<Flex align="center">
			<Button
				mr="2"
				onClick={() => {
					like();

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
	);
}
