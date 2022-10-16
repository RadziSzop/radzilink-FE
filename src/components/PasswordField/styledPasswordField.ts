import styled from "styled-components";

export const StyledPasswordField = styled.input`
  padding: 0.8rem 3rem 0.8rem 1.5rem;
  border-radius: 30px;
  border: none;
  width: 500px;
  box-shadow: inset 0px 0px 1px 0px #cccccc;
  font-size: 1.2rem;
  color: #131313;
  letter-spacing: 1.5px;
  :focus {
    outline: none;
  }
  ::grammar-error {
    color: none;
  }
`;
export const StyledPasswordFieldContainer = styled.div`
  position: relative;
  margin-top: 1rem;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledSvg = styled.img`
  position: absolute;
  right: 20px;
  /* transform: scale(1.7); */
`;
