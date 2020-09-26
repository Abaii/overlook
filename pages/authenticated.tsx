import React from 'react';
import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { firebaseAdmin } from '../utils/auth/firebaseAdmin';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		// user is authenticated
		const { uid, email } = token;

		// fetch stuff here

		return {
			props: { message: `Your email is ${email} and your UID is ${uid}.` },
		};
	} catch (error) {
		// either the `token` cookie did not exist
		// or the token verification failed
		ctx.res.writeHead(302, { Location: '/login' });
		ctx.res.end();
	}
};
