import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore/lite';
import api from '../services/youtube';

interface UserProps {
	uid: string;

	displayName: string;
	email: string;
	photoURL: string;
	fullname: string;
}
interface VideoProps {
	addAt: string;
	description: string;
	displayName: string;
	fullName: string;
	publishedAt: string;
	title: string;
	userId: string;
	userPhoto: string;
	videoId: string;
	liked: string[];
	unliked: string[];
}
interface User {
	user: UserProps;
}
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

export async function putVideos(db: any, link: string, user: UserProps) {
	const { uid, displayName, photoURL } = user;
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
				const newVideo = await setDoc(doc(db, 'videos', data.id), {
					title: data.snippet.title,
					description: data.snippet.description,
					publishedAt: data.snippet.publishedAt,
					videoId: data.id,
					likes: 0,
					unlikes: 0,
					userId: uid,
					liked: [],
					unliked: [],
					userPhoto: photoURL,
					fullName: displayName,
					displayName: displayName.split(' ').slice(0, 2).join(' '),
					addAt: new Date().getTime(),
				});

				console.log('Worked', newVideo);
			} catch (err) {
				console.error('[ERROR][PutVideos]:', err);
				console.error('[ERROR][]:', uid);
			}
		})();
}

export const saveUserData = async (user: UserProps) => {
	const { uid } = user;
	const usersRef = doc(db, 'users', uid);
	const docSnap = await getDoc(usersRef);
	if (docSnap.exists()) {
	} else {
		saveDb(user);
	}
};
const saveDb = async (user: UserProps) => {
	const { uid, displayName, email, photoURL } = user;
	try {
		const newUser = await setDoc(doc(db, 'users', uid), {
			uid,
			email,
			fullname: displayName,
			displayName: displayName.split(' ').slice(0, 2).join(' '),
			photoURL,
			likes: [],
			unlikes: [],
		});
		console.log('Write doc:', newUser);
	} catch (error) {
		console.error('Error:', error);
	}
};

export default app;
