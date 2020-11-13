import tokens from '../../styles/tokens.json';
import styled from '@emotion/styled';

export const TimelineWrapper = styled.section`
    background-color: white;
    color: ${tokens.paragraph};
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    text-align: center;
`;

export const TimelineHeader = styled.h2`
    color: ${tokens.headline};
    font-size: 5vw;
    margin: 0px 40px 40px 40px;
    font-weight: bold;
`;

export const ImagesContainer = styled.div`
    flex-grow: 0;
    display: flex;
    flex-wrap: wrap;
`;

export const FormButtonWrapper = styled.div`
    margin-top: 22px;
    margin-bottom: 12px;
	display: flex;
	justify-content: center;
`;


export const PhotoWrapper = styled.div<{ imageSrc: string }>`
  height: 300px;
  width: 25%;
  background-boxSize: cover;
  background-position: center;
  background-image: url(${({ imageSrc }) => imageSrc });
  margin: 5px 0px;
  transition: all 0.5s ease-in;
  
  :hover {
      opacity: 0.8;
  }
`;