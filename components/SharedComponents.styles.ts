import styled from '@emotion/styled';
import { css } from '@emotion/core';

interface SplitLinksProps {
	first?: boolean;
}

export const LinkHoverWrapper = styled.div<SplitLinksProps>`
	a:hover {
		padding: 8px;
		border-radius: 16px;
		background-color: #9f7aea;
		color: white;
		text-decoration: none;
	}
	${({ first }) =>
		first &&
		css`
			margin-right: 20px;
		`}
`;
