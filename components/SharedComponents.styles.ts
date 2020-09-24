import styled from "@emotion/styled";
import { css } from "@emotion/core";

interface SplitLinksProps {
	first?: boolean;
}

export const LinkHoverWrapper = styled.div<SplitLinksProps>`
	a:hover {
		padding: 4px 8px 4px 8px;
		border-radius: 20px;
		background: linear-gradient(to right, #b4373d, #b23acb);
		color: white;
		text-align: center;
		text-decoration: none;
	}
	${({ first }) =>
		first &&
		css`
			margin-right: 25px;
		`}
`;
