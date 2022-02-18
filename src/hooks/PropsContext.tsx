import { createContext, useState, useContext } from 'react';
import app from '../firebase/initFirebase';
import { initializeApp } from 'firebase/app';
import Router from 'next/router';
import firebase from '../firebase/initFirebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { saveUserData } from '../firebase/initFirebase';
import 'firebase/auth';

const PropsContext = createContext({});
interface UserProps {
	uid: string;
	email: string;
	name: string;
	token: string;
	provider: any;
	providerURL: string;
}
interface User {
	user: UserProps[];
}

export function PropsProvider({ children }: any) {
	const [isLike, setIsLike] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	function signIn() {
		setLoading(true);
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				// The signed-in user info.
				setUser(result.user);
				saveUserData(result.user);
				setLoading(false);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}

	return (
		<PropsContext.Provider value={{ user, loading, signIn, search }}>
			{children}
		</PropsContext.Provider>
	);
}

export function useProps(): any {
	const context = useContext(PropsContext);
	return context;
}
