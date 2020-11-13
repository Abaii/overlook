import React from 'react';
import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { firebaseAdmin } from '../utils/auth/firebaseAdmin';
import { Flex, Text } from '@chakra-ui/react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		// the user is authenticated!
		const { uid, email } = token;

		// FETCH STUFF HERE!! 🚀

		return {
			props: {
				uid: uid,
				email: email,
			},
		};
	} catch (err) {
		// either the `token` cookie didn't exist
		// or token verification failed
		// either way: redirect to the login page
		ctx.res.writeHead(302, { Location: '/login' });
		ctx.res.end();

		// `as never` prevents inference issues
		// with InferGetServerSidePropsType.
		// The props returned here don't matter because we've
		// already redirected the user.
		return { props: {} as never };
	}
};

export default (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => (
	<Flex justify='center' align='center' flexDirection='column'>
		<Text>{props.uid}</Text>
		<Text>{props.email}</Text>
	</Flex>
);
