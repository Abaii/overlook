import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { firebase } from './initFirebase';
import initFirebase from './initFirebase';
import { auth } from 'firebase';
import router from 'next/router';

initFirebase();

const AuthContext = createContext<{ user: firebase.User | null }>({
	user: null,
});

export function AuthProvider({ children }: any) {
	const [user, setUser] = useState<firebase.User | null>(null);

	useEffect(() => {
		// identical to onAuthStateChanged but also fires when user's ID token is refreshed (happens hourly)
		return firebase.auth().onIdTokenChanged(async (user) => {
			if (!user) {
				setUser(null);
				nookies.set(undefined, 'token', '', {});
				return;
			}

			const token = await user.getIdToken();
			setUser(user);
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

// useAuth hook
export const useAuth = () => {
	return useContext(AuthContext);
};
