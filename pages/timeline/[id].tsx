import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../utils/auth/AuthContext';
import nookies from 'nookies';
import {
	ImagesContainer,
	TimelineHeader,
	TimelineWrapper,
} from '../../components/Timeline/Timeline.styles';
import {
	Text,
	Image,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Icon,
	Flex,
	Box,
	Spinner,
	IconButton,
	Popover,
	Button,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverBody,
	Textarea,
	Stack,
	toast,
	useToast,
	useDisclosure,
} from '@chakra-ui/react';
import Timeline from '../../components/Timeline/Timeline';
import Head from 'next/head';
import TimelineImage from '../../components/TimelineImage/TimelineImage';
import { ChatIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';
import { setCommentRange, tokenToString } from 'typescript';

export interface TimelineTypes {
	title: string;
	description: string;
	content: [
		{
			image_url: string;
			comments: [
				{
					_id: any;
					comment: string;
				}
			];
		}
	];
	published: boolean;
	ownerId: string;
	contributorsIds: [string];
}

export const ProjectTimeline = () => {
	const router = useRouter();
	const { id } = router.query;
	const [loaded, setLoaded] = useState(false);
	const { user, loading } = useAuth();
	const [timeline, setTimeline] = useState<TimelineTypes>();
	const [isSubmitting, setSubmitting] = useState(false);
	const toast = useToast();
	const [comment, setComment] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const addComment = async (image, comment) => {
		setSubmitting(true);

		if (comment) {
			image.comments.push({ comment: comment });
		} else {
			setSubmitting(false);
			return;
		}

		const { token } = await user.getIdTokenResult();

		axios
			.put('http://localhost:8080/api/timelines/' + id, timeline, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => {
				setSubmitting(false);
				console.log(response.data);
			})
			.catch((err) => {
				setSubmitting(false);
				console.log(err);
			});
	};

	const getTimeline = async () => {
		const { token } = await user.getIdTokenResult();

		axios
			.get('http://localhost:8080/api/timelines/' + id, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => {
				setLoaded(true);
				setTimeline(response.data);
			})
			.catch((err) => {
				setLoaded(true);
				console.error(err);
			});
	};

	const deleteComment = async (result, image) => {
		const { token } = await user.getIdTokenResult();
		const index = timeline.content.indexOf(image);
		timeline.content[index].comments = result;

		axios
			.put('http://localhost:8080/api/timelines/' + id, timeline, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((resp) => {
				console.log(resp);
				toast({
					title: 'Deleted Comment',
					description: 'Comment successfully deleted.',
					status: 'success',
					duration: 1000,
					isClosable: true,
					position: 'bottom',
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	if (user && loaded == false) {
		getTimeline();
	}

	return (
		<>
			<Head>
				{user && timeline && <title>{timeline.title}</title>}
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-boxSize=%2290%22>🌍</text></svg>'
				/>
			</Head>

			{!loading ? (
				<>
					<Breadcrumb
						ml='30px'
						my={4}
						spacing='8px'
						separator={<ChevronRightIcon color='gray.300' />}
					>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbItem>
							<BreadcrumbLink href='/timelines'>Timelines</BreadcrumbLink>
						</BreadcrumbItem>

						{user && timeline && (
							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink href='#'>{timeline.title}</BreadcrumbLink>
							</BreadcrumbItem>
						)}
					</Breadcrumb>

					{user && timeline && (
						<TimelineWrapper>
							<Heading
								fontSize={['40px', '40px', '5vw']}
								style={{
									margin: '0px 40px 40px 40px',
									fontWeight: 'bold',
									textAlign: 'center',
								}}
							>
								{timeline.title}
							</Heading>
							<Text fontSize='sm' opacity={0.8} margin='-20px 10px 60px 10px'>
								{timeline.description}
							</Text>
							{timeline.content && (
								<ImagesContainer>
									{timeline.content.map((image) => (
										<Popover placement='top'>
											<Box>
												<TimelineImage image={image} deleteComment={deleteComment} />

												<PopoverTrigger>
													<IconButton
														icon={<ChatIcon />}
														aria-label='add comment button'
														rounded='full'
														mt={2}
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
																resize='none'
																onChange={(e) => setComment(e.target.value)}
															/>
															<Button
																colorScheme='green'
																onClick={() => addComment(image, comment)}
																isLoading={isSubmitting}
															>
																Add Comment
															</Button>
														</Box>
													</PopoverBody>
												</PopoverContent>
											</Box>
										</Popover>
									))}
								</ImagesContainer>
							)}
						</TimelineWrapper>
					)}
				</>
			) : (
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
			)}
		</>
	);
};

export default ProjectTimeline;
