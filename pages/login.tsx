import React from 'react';
import { render } from 'react-dom';
import LoginForm from '../components/Login/Login';
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
