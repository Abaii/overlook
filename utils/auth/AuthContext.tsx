import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { firebase } from './initFirebase';
import initFirebase from './initFirebase';
import { auth } from 'firebase';

const AuthContext = createContext<{ user: firebase.User | null }>({
	user: null,
});

export function AuthProvider({ children }: any) {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		// identical to onAuthStateChanged but also fires when user's ID token is refreshed (happens hourly)
		return firebase.auth().onIdTokenChanged(async (user) => {
			if (!user) {
				setUser(null);
				setLoading(false);
				nookies.set(undefined, 'token', '', {});
				return;
			}

			const token = await user.getIdToken();
			setUser(user);
			setLoading(false);
			// set a token cookie containing the user ID - now all outgoing requests will have user ID as a cookie
			nookies.set(undefined, 'token', token, {});
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

// signOut function
export const signOut = async () => {
	await auth().signOut();
};

export const googleLogin = () => {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function (result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential;
			// The signed-in user info.
			var user = result.user;
			// ...
		})
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
};

// useAuth hook
export const useAuth = () => {
	return useContext(AuthContext);
};
