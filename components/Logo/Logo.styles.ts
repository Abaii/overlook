import styled from '@emotion/styled';

export const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 4px;
`;

export const Icon = styled.div`
	height: 30px;
	width: 30px;
	transform: rotate(45deg);
	background: linear-gradient(to right, #b4373d, #b23acb);

	animation-name: icon-anim;
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
	font-size: 30px;
	margin: 0 0 0 0;
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

	animation-name: udt-anim;
	animation-duration: 1.2s;
	@keyframes udt-anim {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;