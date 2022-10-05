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
  padding: 1rem;
  /* padding: 0.5rem 1rem; */
  /* display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  border-radius: 10px;
  height: 150px;
  flex-wrap: wrap;
  /* background-color: white; */
  background-color: #ffffff;
  position: relative;
  /* ${StyledInputContainer}:not(:last-child) {
    border-bottom: 2px solid #e9eaee;
  } */
`;
export const StyledCustomizeLabel = styled.p`
  color: #4c4c4c;
  font-weight: 600;
`;
