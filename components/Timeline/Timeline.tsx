import React, { useEffect, useState } from 'react';
import { PhotoWrapper, TimelineHeader, TimelineWrapper, ImagesContainer } from './Timeline.styles';
import axios from 'axios';
import { Text } from '@chakra-ui/core';
export const MOCK_TIMELINE_DATA = {
    title: 'Overlook project.',
}

export interface TimelineProps {
    title: string;
    id: string;
};

const Timeline = ({ title, id }: TimelineProps) => {
    const [urls, setUrls] = useState<any>({});
    useEffect(() => {
        (async () => {
           
            const { data } = await axios.get(`https://api.unsplash.com/photos\?client_id\=gKoR6Wm61DGTJpR-PQzTl7gEEjjEXd4n3C0IrJT0Kqw`, { headers: {
                'Access-Control-Allow-Origin': '*',
            }});
            const urls = data.map(( image ) => image.urls.raw);
            setUrls(urls);
        })();
    }, [])
    return (
        <TimelineWrapper>
            <TimelineHeader>{title}</TimelineHeader>
            <Text font-size="sm" opacity={0.8} margin='-50px 10px 60px 10px'>This is my art project that I made. Here you can find my thought process.</Text>
            <ImagesContainer>
                {[0,1,2,3,4,5,6,7,8].map((item) => <PhotoWrapper key={item} imageSrc={urls[item]}/>)}
            </ImagesContainer>
        </TimelineWrapper>
    )
};

export default Timeline;