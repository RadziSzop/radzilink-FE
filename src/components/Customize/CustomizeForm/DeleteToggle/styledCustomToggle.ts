import styled from "styled-components";
interface IProps {
  customSettings: boolean;
}
export const StyledSwitch = styled.div<IProps>`
  width: 52.5px;
  height: 32.5px;
  background-color: ${(props) =>
    // props.customSettings ? "rgba(0, 200, 0, 0.4)" : "rgba(155, 155, 155, 0.4)"};
    props.customSettings ? "rgb(237, 193, 145)" : "rgba(155, 155, 155, 0.4)"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 4px;
  cursor: pointer;
  justify-content: ${(props) =>
    props.customSettings ? "flex-end" : "flex-start"};
`;

export const StyledHandle = styled.div`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 15px;
`;
