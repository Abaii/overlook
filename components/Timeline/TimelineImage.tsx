import React, { useState, useRef } from "react";

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
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from "@chakra-ui/react";
import { AddIcon, ChatIcon, ChevronDownIcon, ChevronUpIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface Props {
	image: {
		_id: any;
		image_url: string;
		comments: [
			{
				_id: any;
				comment: string;
			}
		];
	};
	deleteComment(id: number, image: object): any;
	deleteImage(id: number);
}

const MotionButton = motion.custom(Button);

const TimelineImage = ({ image, deleteComment, deleteImage }: Props) => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const cancelRef = useRef();

	const alertClose = () => {
		setAlertOpen(!alertOpen);
	};

	const deleteCommentLocal = (comment) => {
		deleteComment(comment._id, image);
	};

	return (
		<Flex flexDirection='column' pr='20px'>
			<Image minW='450px' maxW='450px' src={image.image_url} />
			<Box borderBottomRadius='10px' bg='white' h='35px' w='100%' p='5px 5px 0 0' display='flex' justifyContent='flex-end'>
				<Stack isInline>
					<PopoverTrigger>
						<IconButton
							icon={<ChatIcon />}
							size='xs'
							colorScheme='green'
							aria-label='add comment to image'
							onClick={() => setShowComments(true)}
						/>
					</PopoverTrigger>
					<IconButton
						icon={showComments ? <ChevronUpIcon /> : <ChevronDownIcon />}
						size='xs'
						colorScheme='blue'
						aria-label='view image comments'
						onClick={() => setShowComments(!showComments)}
					/>
					<IconButton
						icon={<DeleteIcon />}
						size='xs'
						colorScheme='red'
						aria-label='delete image'
						onClick={() => setAlertOpen(!alertOpen)}
					/>
				</Stack>
			</Box>

			<AlertDialog isOpen={alertOpen} leastDestructiveRef={cancelRef} onClose={alertClose}>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader fontboxSize='lg' fontWeight='bold'>
						Delete Image
					</AlertDialogHeader>

					<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={alertClose}>
							Cancel
						</Button>
						<Button
							colorScheme='red'
							onClick={() => {
								deleteImage(image._id);
								setAlertOpen(!alertOpen);
							}}
							ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{showComments && (
				<>
					{image.comments.length ? (
						<Box p={3} rounded='lg' bgColor='white' height='100%' width='100%' mt={2}>
							{image.comments.map((singleComment) => (
								<Box display='flex' justifyContent='space-between' flexDirection='row' w='100%' mb='10px'>
									<Text>{singleComment.comment}</Text>
									<IconButton
										ml='10px'
										icon={<DeleteIcon />}
										size='xs'
										aria-label='delete comment'
										onClick={() => deleteCommentLocal(singleComment)}
									/>
								</Box>
							))}
						</Box>
					) : (
						<Text>No Comments</Text>
					)}
				</>
			)}
		</Flex>
	);
};

export default TimelineImage;
