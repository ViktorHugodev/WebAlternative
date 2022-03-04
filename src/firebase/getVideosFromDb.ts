import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from './initFirebase';

export const getVideosFromDb = async () => {
	const videosCol = collection(db, 'videos');
	const queryByOrderLiked = query(videosCol, orderBy('likes', 'desc'));
	const querySnap = await getDocs(queryByOrderLiked);
	const data = querySnap.docs.map((doc) => doc.data());
	return data;
};
