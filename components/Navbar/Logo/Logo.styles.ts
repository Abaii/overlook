import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface AnimationProps {
	animation: boolean;
}
export const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 4px;
`;

export const Icon = styled.div<AnimationProps>`
	height: 30px;
	width: 30px;
	transform: rotate(45deg);
	background: linear-gradient(to right, #b4373d, #b23acb);

	${({ animation }) =>
		animation &&
		css`
			animation-name: icon-anim;
		`}
	animation-duration: 1.6s;
	@keyframes icon-anim {
		from {
			transform: rotate(45deg);
		}
		to {
			//405 is a full rotation - half is 225
			transform: rotate(405deg);
		}
	}
`;

export const TextWrapper = styled.div`
	font-boxSize: 30px;
	margin: -4px 0 0 0;
`;

export const UDTriangle = styled.div`
	width: 0;
	height: 0;
	position: relative;
	left: -25px;
	top: 4px;
	border-left: 10px solid transparent !important;
	border-right: 10px solid transparent !important;
	border-top: 10px solid white !important;
`;
