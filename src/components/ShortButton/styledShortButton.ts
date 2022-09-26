import styled from "styled-components";

export const StyledShortButton = styled.div`
  padding: 0.7rem;
  position: absolute;
  right: 10px;
  border-radius: 30px;
  height: 40px;
  min-width: 40px;
  background-color: #ec755d;
  border: none;
  outline: none;

  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 2;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 70%;
    background: #ffffff;
    animation: loading 2s linear infinite;
  }
  &::after {
    content: "";
    position: absolute;
    background: #ec755d;
    inset: 2px;
    border-radius: 30px;
  }
  @keyframes loading {
    to {
      transform: rotate(1turn);
    }
  }
`;
export const StyledButtonText = styled.p`
  color: white;
  font-weight: 700;
  font-size: 1rem;
  z-index: 1;
`;
