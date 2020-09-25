import React from 'react';
import RegistrationForm from '../components/Auth/Registration/Registration';
import { HomePage } from '../styles/global_emotion.styles';

const Register = () => {
	return (
		<>
			<HomePage>
				<RegistrationForm />
			</HomePage>
		</>
	);
};

export default Register;
