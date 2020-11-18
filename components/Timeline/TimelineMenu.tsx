import { DragHandleIcon } from '@chakra-ui/icons';
import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import TimelineModal from './TimelineModal';

interface Props {
	addTimeline: (timeline: any) => void;
}

const TimelineMenu = ({ addTimeline }: Props) => {
	return (
		<>
			<Flex
				bottom='45%'
				left='100%'
				position='sticky'
				width='fit-content'
				bg='#e2e8f0'
				p={2}
				rounded='lg'
			>
				<Stack align='center'>
					<Text
						style={{
							writingMode: 'vertical-rl',
							textOrientation: 'mixed',
						}}
						pl={1}
					>
						Menu
					</Text>
					<DragHandleIcon transform='rotate(90deg);' />
					<TimelineModal addTimeline={addTimeline} />
				</Stack>
			</Flex>
		</>
	);
};

export default TimelineMenu;
