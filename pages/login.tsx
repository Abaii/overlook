import React from 'react';
import { LoginFullPage } from '../components/Auth/Login/Login';
import { HomePage } from '../styles/global_emotion.styles';

const Login = () => {
	return (
		<>
			<HomePage>
				<LoginFullPage />
			</HomePage>
		</>
	);
};

export default Login;
