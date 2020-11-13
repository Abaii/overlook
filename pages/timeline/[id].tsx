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
} from '@chakra-ui/react';
import Timeline from '../../components/Timeline/Timeline';
import Head from 'next/head';
import TimelineImage from '../../components/TimelineImage/TimelineImage';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';

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
	const token = nookies.get({}, 'token');
	const [timeline, setTimeline] = useState<TimelineTypes>();

	const [showComments, setShowComments] = useState(false);

	const getTimeline = () => {
		axios
			.get('http://localhost:8080/api/timelines/' + id, {
				headers: {
					Authorization: 'Bearer ' + token.token,
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
								}}
							>
								{timeline.title}
							</Heading>
							<Text fontSize='sm' opacity={0.8} margin='-50px 10px 60px 10px'>
								{timeline.description}
							</Text>
							{timeline.content && (
								<ImagesContainer>
									{timeline.content.map((image) => (
										<TimelineImage image={image} />
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
