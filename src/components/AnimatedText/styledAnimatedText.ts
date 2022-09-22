import styled from "styled-components";
interface IProps {
  fontSize: string;
}

export const StyledAnimatedH1 = styled.h1<IProps>`
  text-align: center;
  font-size: ${(props) => props.fontSize};
`;
