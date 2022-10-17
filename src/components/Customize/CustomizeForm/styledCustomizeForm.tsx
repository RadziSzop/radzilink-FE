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
  grid-template-rows: 1fr 1fr;
  width: 100%;
  border-radius: 10px;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 1px 0px #cccccc;
  position: relative;
`;
export const StyledCustomizeLabel = styled.p`
  color: #4c4c4c;
  font-weight: 600;
`;
