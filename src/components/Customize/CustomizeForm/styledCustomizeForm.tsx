import styled from "styled-components";
export const StyledInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 300px;
  width: 100%;
  height: fit-content;
  padding: 0.5rem;
`;

export const StyledCustomizeForm = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  width: 100%;
  max-width: 700px;
  border-radius: 10px;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 1px 0px #cccccc;
  position: relative;
  > * {
    &:first-child {
      border-right: 2px solid #f1f1f1;
    }
  }
`;
export const StyledCustomizeLabel = styled.p`
  flex-grow: 1;
  color: #4c4c4c;
  font-weight: 600;
`;
export const StyledCustomizeInput = styled.input`
  margin-right: 1rem;
`;
