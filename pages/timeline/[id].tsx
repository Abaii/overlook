import React, { useEffect, useState } from 'react';
import Timeline, { MOCK_TIMELINE_DATA } from '../../components/Timeline/Timeline';
import { useRouter } from 'next/router';


const ProjectTimeline = () => {
    const router = useRouter();
    const { id } = router.query;

    return (<Timeline {...MOCK_TIMELINE_DATA} id={id as string}/>)
}

export default ProjectTimeline;