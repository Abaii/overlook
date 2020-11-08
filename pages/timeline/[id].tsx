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
} from '@chakra-ui/core';
import Timeline from '../../components/Timeline/Timeline';

export interface TimelineTypes {
	title: string;
	description: string;
	content: [
		{
			image_url: string;
			comment: [string];
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
	// Use this id value to get the Timeline by axios
	// Display the data returned here
	// EZ Win

	return (
		<>
			<Breadcrumb
				ml='30px'
				my={4}
				spacing='8px'
				separator={<Icon color='gray.300' name='chevron-right' />}
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
					<TimelineHeader>{timeline.title}</TimelineHeader>
					<Text font-size='sm' opacity={0.8} margin='-50px 10px 60px 10px'>
						{timeline.description}
					</Text>
					{timeline.content && (
						<ImagesContainer>
							{timeline.content.map((image) => (
								<Image src={image.image_url} />
							))}
						</ImagesContainer>
					)}
				</TimelineWrapper>
			)}
		</>
	);
};

export default ProjectTimeline;
