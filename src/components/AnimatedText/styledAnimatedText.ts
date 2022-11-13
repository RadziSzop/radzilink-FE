import styled from "styled-components";
interface IProps {
  fontSize: string;
  textAlign?: string;
}

export const StyledAnimatedText = styled.p<IProps>`
  white-space: nowrap;
  text-align: ${({ textAlign }) => textAlign};
  font-size: ${({ fontSize }) => fontSize};
`;
