import styled from "styled-components";

export const StyledRedirectHeader = styled.h2`
  color: white;
  font-size: 5rem;
  text-align: end;
  @media (max-width: 450px) {
    font-size: 2.75rem;
  }
`;
export const StyledRedirectSpan = styled.span`
  text-align: right;
  font-size: 4.5rem;
  color: #ec6e55;
  @media (max-width: 450px) {
    font-size: 2.5rem;
  }
`;
export const StyledPasswordHeader = styled.h2`
  color: white;
  font-size: 3rem;
  @media (max-width: 500px) {
    font-size: 1.75rem;
  }
`;

export const StyledPasswordSpan = styled.span`
  font-size: 3rem;
  display: inline-block;
  margin-left: 1rem;
  font-weight: 700;
  color: #ec6e55;
  @media (max-width: 500px) {
    font-size: 1.75rem;
  }
`;
export const StyledPassTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
