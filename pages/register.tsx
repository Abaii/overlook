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
					href='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/water-wave_1f30a.png'
				/>
			</Head>
			<HomePage>
				<RegistrationFullPage />
			</HomePage>
		</>
	);
};

export default Register;
