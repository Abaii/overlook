import { Box, Heading, Divider, Text, Tag, Flex } from '@chakra-ui/core';
import React from 'react';

export default function TimelineCard({ user, timeline }) {
	return (
		<>
			<Box rounded='lg' borderWidth='1px' overflow='hidden' height='100%' p={5}>
				<Heading>{timeline.title}</Heading>
				<Divider />
				<Text my='20px'>{timeline.description}</Text>
				<Tag variantColor='green' rounded='full'>
					{user.displayName || user.email.split('@')[0]}
				</Tag>
			</Box>
		</>
	);
}
