// auth controls
import initFirebase, { firebase } from './initFirebase';

initFirebase();

const auth = firebase.auth();

export const signOut = () => auth.signOut();
