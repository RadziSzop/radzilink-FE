import styled from "styled-components";
interface IProps {
  fontSize: string;
  textAlign?: string;
}

export const StyledAnimatedH1 = styled.h1<IProps>`
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) => props.fontSize};
`;
