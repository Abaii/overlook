import styled from '@emotion/styled';

export const HomePage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

export const Page = styled.div`
	display: flex;
	flex-direction: column;
`;

export const LandingTextWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LandingImageWrapper = styled.div`
	img {
		height: 500px;
		margin: 20px;
	}
	background-color: white;
	margin: 20px;
`;

export const BottomOfPage = styled.div`
	position: fixed;
	bottom: 20px;
	display: flex;
	justify-content: center;
	width: 100%;
`;
