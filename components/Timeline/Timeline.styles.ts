import tokens from '../../styles/tokens.json';
import styled from '@emotion/styled';

export const TimelineWrapper = styled.section`
    background-color: white;
    color: ${tokens.paragraph};
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    text-align: center;
    height: fit-content;
`;

export const TimelineHeader = styled.h2`
    color: ${tokens.headline};
    font-size: 5vw;
    margin: 0px 40px 40px 40px;
    font-weight: bold;
`;

export const ImagesContainer = styled.div`
    display: flex;
    background-color: #EDF2F7;
    border-radius: 10px;
    padding: 20px;
    overflow-x: auto;
    overflow-y: hidden;
`;

export const FormButtonWrapper = styled.div`
    margin-top: 22px;
    margin-bottom: 12px;
	display: flex;
	justify-content: center;
`;