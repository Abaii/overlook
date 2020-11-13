import React, { useState } from 'react';

import {
	Image,
	Box,
	IconButton,
	Text,
	Button,
	Flex,
	Stack,
} from '@chakra-ui/react';
import { AddIcon, ChatIcon, DeleteIcon } from '@chakra-ui/icons';

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
}

const TimelineImage = ({ image }: Props) => {
	const [showComments, setShowComments] = useState(false);

	return (
		<>
			<Flex justify='center' align='center' flexDirection='column'>
				<Image src={image.image_url} width='fit-content' height='fit-content' />

				<Button
					mt={2}
					leftIcon={<ChatIcon />}
					aria-label='show comments'
					onClick={() => setShowComments(!showComments)}
				>
					{showComments ? 'Hide Comments' : 'View Comments'}
				</Button>
				{showComments && (
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
								/>
							</Stack>
						))}
						<IconButton
							icon={<AddIcon />}
							aria-label='add comment button'
							rounded='full'
						/>
					</Box>
				)}
			</Flex>
		</>
	);
};

export default TimelineImage;
