import React from 'react';
import { RegistrationFullPage } from '../components/Auth/Registration/Registration';
import { HomePage } from '../styles/global_emotion.styles';

const Register = () => {
	return (
		<>
			<HomePage>
				<RegistrationFullPage />
			</HomePage>
		</>
	);
};

export default Register;
