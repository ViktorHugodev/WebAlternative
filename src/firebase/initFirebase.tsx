import { initializeApp,  } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
} from 'firebase/firestore/lite';
import api from '../services/youtube';
import 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// const provider = new GoogleAuthProvider();

const clientCredentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const app = initializeApp(clientCredentials);
export const db = getFirestore(app);

export async function getVideos(db: any) {
	const videosCol = collection(db, 'videos');
	const videosSnap = await getDocs(videosCol);
	const videosList = videosSnap.docs.map((doc) => doc.data());

	return videosList;
}

export async function putVideos(db: any, link: string) {
	const res = await api.get(
		`/videos?key=${
			process.env.NEXT_PUBLIC_YT_API_KEY
		}&part=id,snippet,statistics&id=${link.split('v=')[1]}`
	);

	const data = res.data.items[0];
	console.log('Response API Youtube: ', data);
	data &&
		(async () => {
			try {
				const newVideo = await addDoc(collection(db, 'videos'), {
					title: data.snippet.title,
					description: data.snippet.description,
					publishedAt: data.snippet.publishedAt,
					videoId: data.id,
					likes: 0,
					unlikes: 0,
				});

				console.log('Worked', newVideo.id);
			} catch (err) {
				console.error('[ERROR][PutVideos]:', err);
			}
		})();
}

export default app;
