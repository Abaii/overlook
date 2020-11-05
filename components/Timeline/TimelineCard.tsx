import { Box, Heading, Divider, Text, Tag, Flex } from '@chakra-ui/core';
import React from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion.custom(Box);

export default function TimelineCard({ user, timeline }) {
	return (
		<>
			<MotionBox
				rounded='lg'
				borderWidth='1px'
				overflow='hidden'
				height='100%'
				p={5}
				whileHover={{ scale: 1.05 }}
				whileTap={{
					scale: 0.975,
					opacity: 0.8,
				}}
			>
				<Heading>{timeline.title}</Heading>
				<Divider />
				<Text my='20px'>{timeline.description}</Text>
				<Tag variantColor='green' rounded='full'>
					{user.displayName || user.email.split('@')[0]}
				</Tag>
			</MotionBox>
		</>
	);
}
