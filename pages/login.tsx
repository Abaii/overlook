import Head from 'next/head';
import React from 'react';
import { LoginFullPage } from '../components/Auth/Login/Login';
import { HomePage } from '../styles/global_emotion.styles';

const Login = () => {
	return (
		<>
			<Head>
				<title>Overlook | Login</title>
				<link
					rel='icon'
					href='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/water-wave_1f30a.png'
				/>
			</Head>

			<HomePage>
				<LoginFullPage />
			</HomePage>
		</>
	);
};

export default Login;
