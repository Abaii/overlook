import React, { useState } from 'react';

import {
	Image,
	Box,
	IconButton,
	Text,
	Button,
	Flex,
	Stack,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverBody,
	PopoverHeader,
	Textarea,
} from '@chakra-ui/react';
import { AddIcon, ChatIcon, DeleteIcon } from '@chakra-ui/icons';
import TimelineComments from './TimelineComments';
import { motion } from 'framer-motion';

interface Props {
	image: {
		image_url: string;
		comments: [
			{
				_id: any;
				comment: string;
			}
		];
	};
	deleteComment: any;
}

const MotionButton = motion.custom(Button);

const TimelineImage = ({ image, deleteComment }: Props) => {
	const [showComments, setShowComments] = useState(false);

	const showComment = async (comment) => {
		const result = image.comments.filter((rComment) => rComment != comment);
		deleteComment(result, image);
	};

	return (
		<Flex justify='center' align='center' flexDirection='column'>
			<Image src={image.image_url} width='fit-content' height='fit-content' />

			<MotionButton whileHover={{ opacity: 1 }} opacity='0.4' top='-100px'>
				Settings
			</MotionButton>

			<Box
				borderWidth='1px'
				p={5}
				rounded='lg'
				height='fit-content'
				width='fit-content'
				mt={2}
			>
				{image.comments.map((singleComment) => (
					<Stack isInline>
						<Text>{singleComment.comment}</Text>
						<IconButton
							icon={<DeleteIcon />}
							size='xs'
							aria-label='delete comment'
							onClick={() => showComment(singleComment)}
						/>
					</Stack>
				))}
			</Box>
		</Flex>
	);
};

export default TimelineImage;
