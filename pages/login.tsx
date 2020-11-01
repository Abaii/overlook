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
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>'
				/>
			</Head>

			<HomePage>
				<LoginFullPage />
			</HomePage>
		</>
	);
};

export default Login;
