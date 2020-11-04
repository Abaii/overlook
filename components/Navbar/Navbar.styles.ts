import styled from "@emotion/styled";
import tokens from '../../styles/tokens.json';

export const NavbarElementWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  background-color: ${tokens.secondaryBackground};
  width: 100%;
  // top right bottom left
  padding: 10px 100px 10px 100px;
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
