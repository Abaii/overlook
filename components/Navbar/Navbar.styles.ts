import styled from "@emotion/styled";
import tokens from '../../styles/tokens.json';

export const NavbarElementWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  background-color: ${tokens.secondaryBackground};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  // top right bottom left
  padding: 10px 40px 14px 40px;
`;

export const SplitLinks = styled.div`
	display: flex;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 15px;
`;

export const LogoLink = styled.div`
	a {
		text-decoration: none !important;
		box-shadow: none !important;
	}
`;
