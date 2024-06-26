import styled from "styled-components";

export const StyledLinkBar = styled.input`
  padding: 1rem 7rem 1rem 1.5rem;
  border-radius: 30px;
  border: none;
  max-width: 1000px;
  box-shadow: inset 0px 0px 1px 0px #cccccc;
  font-size: 1.25rem;
  color: #131313;
  letter-spacing: 1.5px;
  width: 100%;
  :focus {
    outline: none;
  }
  ::grammar-error {
    color: none;
  }
`;
