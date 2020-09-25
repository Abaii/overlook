import React from 'react';
import LoginForm from '../components/Auth/Login/Login';
import { HomePage } from '../styles/global_emotion.styles';

const Login = () => {
	return (
		<>
			<HomePage>
				<LoginForm />
			</HomePage>
		</>
	);
};

export default Login;
