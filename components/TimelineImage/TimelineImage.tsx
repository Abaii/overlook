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
		<Flex justify='center' align='center' flexDirection='column'>
			<Image src={image.image_url} width='fit-content' height='fit-content' />

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
						<IconButton icon={<DeleteIcon />} size='xs' aria-label='delete comment' />
					</Stack>
				))}

				<Popover placement='top'>
					<PopoverTrigger>
						<IconButton
							icon={<ChatIcon />}
							aria-label='add comment button'
							rounded='full'
						/>
					</PopoverTrigger>

					<PopoverContent>
						<PopoverArrow />
						<PopoverHeader>Add a Comment!</PopoverHeader>
						<PopoverBody>
							<Box>
								<Textarea
									id='description'
									variant='filled'
									placeholder='Enter a comment'
									my={2}
									resize='none'
								/>
								<Button colorScheme='green'>Add Comment</Button>
							</Box>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</Box>
		</Flex>
	);
};

export default TimelineImage;
