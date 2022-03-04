import { createContext, useContext, useEffect, useState } from 'react';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { saveUserData } from '../firebase/initFirebase';
import 'firebase/auth';
import {
	getUserFromCookie,
	removeUserCookie,
	setUserCookie,
} from '../firebase/userCookies';
import router from 'next/router';

const PropsContext = createContext({});

export function PropsProvider({ children }: any) {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	function signIn() {
		setLoading(true);
		signInWithPopup(auth, provider)
			.then((result: any) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				// The signed-in user info.
				setUser(result.user);
				saveUserData(result.user);
				// setSession(true);
				setLoading(false);
				console.log(user);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log('ERRO: SignIn:', error);
				// ...
			});
	}
	function signOutAuth() {
		signOut(auth)
			.then(() => {
				removeUserCookie();
				setUser(null);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		// Firebase updates the id token every hour, this
		// makes sure the react state and the cookie are
		// both kept up to date
		const cancelAuthListener = auth.onIdTokenChanged(user => {
			if (user) {
				const userData = user;
				setUserCookie(JSON.stringify(userData));
				setUser(userData);
			} else {
				removeUserCookie();
				setUser(null);
			}
		});

		const userFromCookie = getUserFromCookie();
		if (!userFromCookie) {
			router.push('/');
			return;
		}

		return () => {
			cancelAuthListener();
		};
	}, []);

	return (
		<PropsContext.Provider value={{ user, loading, signIn, signOutAuth }}>
			{children}
		</PropsContext.Provider>
	);
}

export function useProps(): any {
	const context = useContext(PropsContext);
	return context;
}
