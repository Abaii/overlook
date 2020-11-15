import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
	Box,
	IconButton,
	Textarea,
	useDisclosure,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	PopoverHeader,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface Props {
	comments: [
		{
			_id: any;
			comment: string;
		}
	];
}

const TimelineComments = ({ comments }: Props) => {
	return <></>;
};

export default TimelineComments;
