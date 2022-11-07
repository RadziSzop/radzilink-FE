import styled from "styled-components";

export const StyledCustomInput = styled.input`
  /* font-family: inherit; */
  width: 60%;
  letter-spacing: 1.3px;
  border: 0;
  border-bottom: 1px solid #444;
  outline: 0;
  font-size: 1rem;
  color: #272727;
  margin-top: 3px;
  padding: 3px 0;
  &::placeholder {
    letter-spacing: normal;
  }
`;
