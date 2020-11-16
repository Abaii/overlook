import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

interface Props {}

const LoadingPage = (props: Props) => {
	return (
		<>
			<Flex
				justify='center'
				align='center'
				rounded='lg'
				height='90vh'
				p={2}
				m={2}
				bg='white'
			>
				<Spinner
					thickness='4px'
					emptyColor='gray.200'
					color='blue.500'
					speed='0.8s'
					size='xl'
				/>
			</Flex>
		</>
	);
};

export default LoadingPage;
