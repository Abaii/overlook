import { Box, Heading, Divider, Tag } from '@chakra-ui/core';
import React from 'react';

export default function TimelineCard({ user, timeline }) {
	return (
		<>
			<Box rounded='lg' overflow='hidden' bg='white' height='100%' p={5}>
				<Heading>{timeline.title}</Heading>
				<Divider />
				<p style={{ marginBottom: '20px', marginTop: '20px' }}>
					{timeline.description}
				</p>
				<Tag variantColor='green' rounded='full'>
					{user.displayName || user.email.split('@')[0]}
				</Tag>
			</Box>
		</>
	);
}
