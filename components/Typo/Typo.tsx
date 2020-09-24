import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

interface Props {
	p_text: string;
	style?: CSSProperties;
}

const RemovePaddingWrapper = styled.div`
	p {
		margin: 0 0 5px 0;
	}
`;

export const Typo = (props: Props) => {
	return (
		<>
			<RemovePaddingWrapper>
				<p style={props.style}>{props.p_text}</p>
			</RemovePaddingWrapper>
		</>
	);
};

export default Typo;
