import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../../utils/auth/AuthContext";
import nookies from "nookies";
import { ImagesContainer, TimelineHeader, TimelineWrapper } from "../../components/Timeline/Timeline.styles";
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
	PopoverFooter,
	PopoverCloseButton,
} from "@chakra-ui/react";
import Timeline from "../../components/Timeline/Timeline";
import Head from "next/head";
import TimelineImage from "../../components/Timeline/TimelineImage";
import { AddIcon, ChatIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";
import { setCommentRange, tokenToString } from "typescript";
import LoadingPage from "../../components/Loading/LoadingPage";
import AddImage from "../../components/Image/AddImage";

export interface TimelineTypes {
	_id: any;
	title: string;
	description: string;
	content: [
		{
			_id: any;
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
	const [comment, setComment] = useState("");
	const initialFocusRef = useRef();

	useEffect(() => {
		(async () => {
			if (user) {
				const { token } = await user.getIdTokenResult();
				await axios({
					method: "get",
					url: "http://localhost:8080/api/timelines/" + id,
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "text/event-stream",
					},
				})
					.then((resp) => {
						setTimeline(resp.data);
						setLoaded(!loaded);
					})
					.catch((err) => {
						setLoaded(!loaded);
						console.error(err);
					});
			}
		})();
	}, [user]);

	const addImage = async () => {};

	const addComment = async (image, comment) => {
		setSubmitting(true);
		const index = timeline.content.indexOf(image);
		const { token } = await user.getIdTokenResult();

		if (comment) {
			setTimeline((prevData: any) => {
				const newComments = [
					...prevData.content[index].comments,
					{
						comment: comment,
					},
				];

				const newContent = {
					...prevData.content[index],
					comments: newComments,
				};

				let data = prevData.content.slice();
				data[index] = newContent;

				const newTimeline = {
					...prevData,
					content: data,
				};

				apiAddComment(newTimeline, token);

				return newTimeline;
			});
			setComment("");
			setSubmitting(false);
		} else {
			setSubmitting(false);
			toast({
				title: "Comment Error:",
				description: "Please enter a comment!",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
	};

	const apiAddComment = async (timeline, token) => {
		await axios
			.put("http://localhost:8080/api/timelines/" + id, timeline, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((response) => {
				setSubmitting(false);
			})
			.catch((err) => {
				setSubmitting(false);
				console.log(err);
			});
	};

	const apiDelComment = (timeline, token) => {
		axios
			.put("http://localhost:8080/api/timelines/" + id, timeline, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((resp) => {
				toast({
					title: "Deleted Comment",
					description: "Comment successfully deleted.",
					status: "success",
					duration: 1000,
					isClosable: true,
					position: "bottom",
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const apiDelImage = (timeline, token) => {
		axios
			.put("http://localhost:8080/api/timelines/" + id, timeline, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((resp) => {
				toast({
					title: "Deleted Image",
					description: "Image successfully deleted.",
					status: "success",
					duration: 1000,
					isClosable: true,
					position: "bottom",
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const deleteComment = async (id, image) => {
		const { token } = await user.getIdTokenResult();
		const index = timeline.content.indexOf(image);

		setTimeline((prevData: any) => {
			const newComments = prevData.content[index].comments.filter((comment) => comment._id != id);
			const newImage = {
				image_url: prevData.content[index].image_url,
				_id: prevData.content[index]._id,
				comments: newComments,
			};

			let data = prevData.content.slice();

			data[index] = newImage;

			const newTimeline = {
				...prevData,
				content: data,
			};

			apiDelComment(newTimeline, token);

			return newTimeline;
		});
	};

	const deleteImage = async (id) => {
		const { token } = await user.getIdTokenResult();
		setTimeline((prevData: any) => {
			let data = prevData.content.filter((image) => image._id != id);

			const newTimeline = {
				...prevData,
				content: data,
			};

			apiDelImage(newTimeline, token);

			return newTimeline;
		});
	};

	return (
		<>
			<Head>
				{user && timeline && <title>Overlook | {timeline.title}</title>}
				<link
					rel='icon'
					href='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/water-wave_1f30a.png'
				/>
			</Head>

			{!loading ? (
				<>
					<Breadcrumb ml='30px' my={4} spacing='8px' separator={<ChevronRightIcon color='gray.300' />}>
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
								fontSize={["40px", "40px", "5vw"]}
								style={{
									margin: "0px 40px 40px 40px",
									fontWeight: "bold",
									textAlign: "center",
								}}>
								{timeline.title}
							</Heading>
							<Text fontSize='sm' opacity={0.8} margin='-20px 10px 60px 10px'>
								{timeline.description}
							</Text>
							{timeline.content && (
								<Flex backgroundColor='#EDF2F7' borderRadius='10px' p='20px' overflowX='auto'>
									{timeline.content.map((image) => (
										<>
											<Popover placement='bottom' initialFocusRef={initialFocusRef} isLazy>
												{({ isOpen, onClose }) => (
													<>
														<TimelineImage
															image={image}
															deleteComment={deleteComment}
															deleteImage={deleteImage}
														/>
														<PopoverContent>
															<PopoverArrow />
															<PopoverHeader>Add a Comment!</PopoverHeader>
															<PopoverCloseButton />
															<PopoverBody>
																<Textarea
																	id='description'
																	variant='filled'
																	placeholder='Enter a comment'
																	resize='none'
																	value={comment}
																	ref={initialFocusRef}
																	onChange={(e) => setComment(e.target.value)}
																/>
															</PopoverBody>
															<PopoverFooter>
																<Button
																	colorScheme='green'
																	onClick={() => {
																		addComment(image, comment);
																		onClose();
																	}}
																	isLoading={isSubmitting}>
																	Add Comment
																</Button>
															</PopoverFooter>
														</PopoverContent>
													</>
												)}
											</Popover>
										</>
									))}
									<Box display='flex' justifyContent='center' alignItems='center' minW='450px'>
										<AddImage />
									</Box>
								</Flex>
							)}
						</TimelineWrapper>
					)}
				</>
			) : (
				<LoadingPage />
			)}
		</>
	);
};

export default ProjectTimeline;
