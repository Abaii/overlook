import styled from '@emotion/styled';
import { css } from '@emotion/core';
import tokens from '../styles/tokens.json';

interface SplitLinksProps {
	first?: boolean;
}

export const LinkHoverWrapper = styled.div<SplitLinksProps>`
	a:hover {
		padding: 4px 8px 4px 8px;
		border-radius: 20px;
		background: linear-gradient(to right, #b4373d, #b23acb);
		color: ${tokens.buttonTextAlt};
		text-align: center;
		text-decoration: none;
	}
	${({ first }) =>
		first &&
		css`
			margin-right: 25px;
		`}
`;

export const LoggedInInfoWrapper = styled.div<SplitLinksProps>`
	${({ first }) =>
		first &&
		css`
			margin: 0px 25px 0 0;
		`}
	display: flex;
	align-items: center;
`;
