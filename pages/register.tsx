import Head from 'next/head';
import React from 'react';
import { RegistrationFullPage } from '../components/Auth/Registration/Registration';
import { HomePage } from '../styles/global_emotion.styles';

const Register = () => {
	return (
		<>
			<Head>
				<title>Overlook | Register</title>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-boxSize=%2290%22>🌍</text></svg>'
				/>
			</Head>
			<HomePage>
				<RegistrationFullPage />
			</HomePage>
		</>
	);
};

export default Register;
