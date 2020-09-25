import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

interface Props {
	titleText: string;
	tag: React.ElementType;
	style?: CSSProperties;
}

export const Title = ({ titleText, tag, style }: Props) => {
	const Tag = tag;
	return (
		<>
			<Tag style={style}>{titleText}</Tag>
		</>
	);
};

export default Title;
