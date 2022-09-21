import styled from "styled-components";
// interface IPropsStyledLinkBar {}
// export const StyledLinkBar = styled.div// <IPropsStyledLinkBar>`
export const StyledLinkBar = styled.input`
  padding: 1rem;
  border-radius: 10px;
  /* border: 1px solid black; */
  border: none;
  /* width: 80%; */
  max-width: 1000px;
  box-shadow: inset 0px 0px 1px 0px #cccccc;
  font-size: 1.25rem;
  color: #131313;
  letter-spacing: 1.5px;
  :focus {
    outline: none;
  }
  ::grammar-error {
    color: none;
  }
`;
